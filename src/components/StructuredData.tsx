export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Aslam",
    "jobTitle": "Art Director & Product Designer",
    "description": "I'm Aslam, an art director and product designer based in London. With my background in visual arts and technology, I specialize in creating engaging user experiences through interactive design.",
    "url": "https://aslam-portfolio.vercel.app",
    "image": "https://aslam-portfolio.vercel.app/portrait.jpg",
    "sameAs": [
      "https://github.com/aslam",
      "https://linkedin.com/in/aslam",
      "https://twitter.com/aslam"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "UK"
    },
    "knowsAbout": [
      "Digital Design",
      "Product Strategy", 
      "UI/UX Design",
      "Art Direction",
      "Framer",
      "Interactive Design"
    ],
    "alumniOf": "Visual Arts and Technology",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
