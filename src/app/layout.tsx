'use client'


import "./fonts.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";
import CustomCursor from "@/components/CustomCursor";
import { useCursorStore } from "@/hooks/useCursorStore";
import { useEffect } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsHovering, setCursorText, setCursorVariant, isHovering } = useCursorStore();

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
      const interactiveElement = target.closest('a, button, [data-cursor-hover], [role="button"], [role="link"], input, textarea, select') as HTMLElement ||
                                (target.hasAttribute('onclick') ? target : null) ||
                                (target.classList.contains('cursor-pointer') ? target : null);

      // If we found a new interactive element
      if (interactiveElement && interactiveElement !== currentInteractiveElement) {
        currentInteractiveElement = interactiveElement;
        setIsHovering(true);
        setCursorVariant('hover');

        // Get cursor text with priority order and smart defaults
        let text = interactiveElement.getAttribute('data-cursor-text') ||
                  interactiveElement.getAttribute('aria-label') ||
                  interactiveElement.getAttribute('title') ||
                  '';

        // Use element's text content as cursor text if no custom text specified
        if (!text) {
          const elementText = interactiveElement.textContent?.trim() || '';
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
            text = 'View';
          } else if (interactiveElement.tagName === 'BUTTON') {
            // Special handling for buttons
            const buttonType = interactiveElement.getAttribute('type') || '';
            const buttonText = elementText.toLowerCase();

            if (buttonType === 'submit' || buttonText.includes('submit') || buttonText.includes('send')) {
              text = 'Submit';
            } else if (elementText && elementText.length <= 15) {
              text = elementText;
            } else if (elementText && elementText.length > 15) {
              text = elementText.substring(0, 12) + '...';
            } else {
              text = 'Button';
            }
          } else if (elementText && elementText.length <= 15) {
            // Use the actual text content if it's short enough
            text = elementText;
          } else if (elementText && elementText.length > 15) {
            // Truncate long text
            text = elementText.substring(0, 12) + '...';
          } else if (interactiveElement.tagName === 'A' || interactiveElement.getAttribute('href')) {
            text = 'Link';
          } else {
            text = 'Click';
          }
        }

        setCursorText(text);
      }
      // If we're no longer over an interactive element, debounce the reset
      else if (!interactiveElement && currentInteractiveElement) {
        debounceTimer = setTimeout(() => {
          currentInteractiveElement = null;
          setIsHovering(false);
          setCursorVariant('default');
          setCursorText('');
        }, 50); // Small delay to prevent flickering
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (currentInteractiveElement) {
        setCursorVariant('click');
      }
    };

    const handleMouseUp = () => {
      if (currentInteractiveElement) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
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
  }, [setIsHovering, setCursorText, setCursorVariant]);

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
