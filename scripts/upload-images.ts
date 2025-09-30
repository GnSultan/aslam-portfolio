import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials. Make sure .env.local exists with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function uploadImages() {
  const publicDir = path.join(process.cwd(), 'public')
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

  // Get all image files from public directory
  const files = fs.readdirSync(publicDir).filter(file => {
    const ext = path.extname(file).toLowerCase()
    return imageExtensions.includes(ext)
  })

  console.log(`Found ${files.length} images to upload`)

  for (const file of files) {
    try {
      const filePath = path.join(publicDir, file)
      const fileBuffer = fs.readFileSync(filePath)

      // Skip empty files
      if (fileBuffer.length === 0) {
        console.log(`⚠️  Skipping empty file: ${file}`)
        continue
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('portfolio-assets')
        .upload(`portfolio/${file}`, fileBuffer, {
          contentType: `image/${path.extname(file).slice(1)}`,
          upsert: true
        })

      if (error) {
        console.error(`❌ Error uploading ${file}:`, error.message)
      } else {
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio-assets')
          .getPublicUrl(`portfolio/${file}`)

        console.log(`✅ Uploaded: ${file}`)
        console.log(`   URL: ${publicUrl}`)
      }
    } catch (err) {
      console.error(`❌ Failed to process ${file}:`, err)
    }
  }

  console.log('\n✨ Upload complete!')
}

uploadImages().catch(console.error)
