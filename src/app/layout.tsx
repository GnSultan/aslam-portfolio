'use client'


import "./fonts.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import CustomCursor from "@/components/CustomCursor";
import SmartPreloader from "@/components/SmartPreloader";
import { useCursorStore } from "@/hooks/useCursorStore";
import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { setIsHovering, setCursorText, setCursorVariant } = useCursorStore();

  // Memoize the store functions to prevent useEffect dependency changes
  const memoizedSetIsHovering = useCallback(setIsHovering, [setIsHovering]);
  const memoizedSetCursorText = useCallback(setCursorText, [setCursorText]);
  const memoizedSetCursorVariant = useCallback(setCursorVariant, [setCursorVariant]);

  useEffect(() => {
    let currentInteractiveElement: HTMLElement | null = null;
    let debounceTimer: NodeJS.Timeout | null = null;
    let rafId: number = 0;

    // Optimized selectors for better Chrome performance
    const INTERACTIVE_SELECTORS = 'a, button, [data-cursor-hover], [role="button"], [role="link"]';
    const FORM_SELECTORS = 'input, textarea, select';
    const PORTFOLIO_KEYWORDS = ['project', 'gallery', 'work', 'portfolio'];

    // Cache DOM queries for better performance
    const isPortfolioElement = (element: HTMLElement): boolean => {
      const href = element.getAttribute('href');

      // ONLY actual project viewing links should return true
      // Pattern: /projects/{id} (not /admin/projects or other variations)
      if (href?.match(/^\/projects\/[^\/]+\/?$/)) {
        return true;
      }

      // Skip ALL admin pages entirely
      if (href?.includes('/admin/')) {
        return false;
      }

      // Check for elements with specific portfolio data attributes
      // Only "View" alone (not "View Work" or other variations)
      if (element.hasAttribute('data-cursor-text') &&
          element.getAttribute('data-cursor-text')?.toLowerCase() === 'view') {
        return true;
      }

      // Be very conservative with class-based detection
      // Only check for very specific portfolio-related classes
      const className = element.className || '';
      if (className.includes('project-card') || className.includes('portfolio-item')) {
        return true;
      }

      return false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      // Throttle with RAF for better Chrome performance
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const target = event.target as HTMLElement;

        // Clear any pending debounced updates
        if (debounceTimer) {
          clearTimeout(debounceTimer);
          debounceTimer = null;
        }

        // Single DOM query with optimized selector
        const interactiveElement = target.closest(INTERACTIVE_SELECTORS) as HTMLElement ||
                                  (target.hasAttribute('onclick') ? target : null) ||
                                  (target.classList.contains('cursor-pointer') ? target : null);

        // Check for form fields
        const formField = target.closest(FORM_SELECTORS) as HTMLElement;

        // If we found a new interactive element (but not form fields)
        if (interactiveElement && interactiveElement !== currentInteractiveElement && !formField) {
          currentInteractiveElement = interactiveElement;
          memoizedSetIsHovering(true);

          // Only show "View" text and special behavior for actual project links
          if (isPortfolioElement(interactiveElement)) {
            memoizedSetCursorVariant('hover');
            memoizedSetCursorText('View');
          } else {
            // All other interactive elements get subtle hover effect only
            memoizedSetCursorVariant('hover');
            memoizedSetCursorText(''); // No text, just subtle size increase
          }
        }
        // If hovering over form fields, keep cursor in default state
        else if (formField && !interactiveElement) {
          if (currentInteractiveElement) {
            currentInteractiveElement = null;
            memoizedSetIsHovering(false);
            memoizedSetCursorVariant('default');
            memoizedSetCursorText('');
          }
        }
        // If we're no longer over an interactive element, debounce the reset
        else if (!interactiveElement && !formField && currentInteractiveElement) {
          debounceTimer = setTimeout(() => {
            currentInteractiveElement = null;
            memoizedSetIsHovering(false);
            memoizedSetCursorVariant('default');
            memoizedSetCursorText('');
          }, 50); // Small delay to prevent flickering
        }
      });
    };

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactiveElement = target.closest(INTERACTIVE_SELECTORS) as HTMLElement;

      if (interactiveElement) {
        // Use the same optimized portfolio detection
        if (isPortfolioElement(interactiveElement)) {
          memoizedSetCursorVariant('click');
        }

        // Restore default cursor after clicking on buttons only
        if (interactiveElement.tagName === 'BUTTON') {
          setTimeout(() => {
            memoizedSetIsHovering(false);
            memoizedSetCursorVariant('default');
            memoizedSetCursorText('');
            currentInteractiveElement = null;
          }, 100);
        }
      }
    };

    const handleMouseUp = () => {
      if (currentInteractiveElement) {
        memoizedSetCursorVariant('hover');
      } else {
        memoizedSetCursorVariant('default');
      }
    };

    // Use more frequent event checking for better responsiveness
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      currentInteractiveElement = null;
    };
  }, [memoizedSetIsHovering, memoizedSetCursorText, memoizedSetCursorVariant]);

  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body>
        <CustomCursor />
        <SmartPreloader />
        <SmoothScroll>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pathname}>
              {children}
            </motion.div>
          </AnimatePresence>
        </SmoothScroll>
      </body>
    </html>
  );
}
