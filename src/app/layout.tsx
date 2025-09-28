'use client'


import "./fonts.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import CustomCursor from "@/components/CustomCursor";
import { useCursorStore } from "@/hooks/useCursorStore";
import { useEffect, useCallback } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsHovering, setCursorText, setCursorVariant } = useCursorStore();

  // Memoize the store functions to prevent useEffect dependency changes
  const memoizedSetIsHovering = useCallback(setIsHovering, [setIsHovering]);
  const memoizedSetCursorText = useCallback(setCursorText, [setCursorText]);
  const memoizedSetCursorVariant = useCallback(setCursorVariant, [setCursorVariant]);

  useEffect(() => {
    let currentInteractiveElement: HTMLElement | null = null;
    let debounceTimer: NodeJS.Timeout | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Clear any pending debounced updates
      if (debounceTimer) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }

      // Find the closest interactive element
        const interactiveElement = target.closest('a, button, [data-cursor-hover], [role="button"], [role="link"]') as HTMLElement ||
                                  (target.hasAttribute('onclick') ? target : null) ||
                                  (target.classList.contains('cursor-pointer') ? target : null);
        
        // Check for form fields separately (they don't make cursor grow)
        const formField = target.closest('input, textarea, select') as HTMLElement;

      // If we found a new interactive element (but not form fields)
      if (interactiveElement && interactiveElement !== currentInteractiveElement && !formField) {
        currentInteractiveElement = interactiveElement;
        memoizedSetIsHovering(true);

        const href = interactiveElement.getAttribute('href') || '';
        const className = interactiveElement.className || '';
        const parentClasses = interactiveElement.closest('[class*="gallery"], [class*="project"], [class*="work"], [class*="portfolio"]')?.className || '';

        // Check if this is a portfolio/project/gallery related element
        const isPortfolioElement = href.includes('/projects/') ||
                                 className.includes('project') ||
                                 className.includes('gallery') ||
                                 className.includes('work') ||
                                 className.includes('portfolio') ||
                                 parentClasses.includes('gallery') ||
                                 parentClasses.includes('project') ||
                                 parentClasses.includes('work') ||
                                 parentClasses.includes('portfolio') ||
                                 interactiveElement.closest('#gallery') ||
                                 interactiveElement.closest('[id*="project"]') ||
                                 interactiveElement.closest('[id*="work"]');

        if (isPortfolioElement) {
          memoizedSetCursorVariant('hover');
          memoizedSetCursorText('View');
        } else {
          memoizedSetCursorVariant('hover');
          memoizedSetCursorText('');
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
    };

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const interactiveElement = target.closest('a, button, [data-cursor-hover]') as HTMLElement;
      
      if (interactiveElement) {
        const href = interactiveElement.getAttribute('href') || '';
        const className = interactiveElement.className || '';
        const parentClasses = interactiveElement.closest('[class*="gallery"], [class*="project"], [class*="work"], [class*="portfolio"]')?.className || '';

        const isPortfolioElement = href.includes('/projects/') ||
                                 className.includes('project') ||
                                 className.includes('gallery') ||
                                 className.includes('work') ||
                                 className.includes('portfolio') ||
                                 parentClasses.includes('gallery') ||
                                 parentClasses.includes('project') ||
                                 parentClasses.includes('work') ||
                                 parentClasses.includes('portfolio') ||
                                 interactiveElement.closest('#gallery') ||
                                 interactiveElement.closest('[id*="project"]') ||
                                 interactiveElement.closest('[id*="work"]');

        if (isPortfolioElement) {
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
