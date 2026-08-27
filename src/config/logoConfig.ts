/**
 * ==============================================================================
 * MANUAL LOGO CONFIGURATION (EDIT IN CODE)
 * ==============================================================================
 * 
 * You can set your custom logo directly here in code.
 * 
 * Supported options for `src`:
 * 1. Base64 Data URL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 * 2. Public / Asset URL: "/logo.png" (place your image in the public folder)
 * 3. Web URL: "https://your-domain.com/logo.png"
 * 4. Or leave as custom SVG / Data URL provided below.
 */

export interface LogoConfig {
  /**
   * Put your image source string here:
   * Example: "data:image/png;base64,..." or "/logo.png" or "https://..."
   */
  src: string;

  /** Alt text for accessibility */
  alt: string;

  /** Height in pixels on the certificate (default: 75) */
  height: number;

  /** Max width in pixels (default: 280) */
  maxWidth: number;
}

export const CERTIFICATE_LOGO_CONFIG: LogoConfig = {
  // 👉 PASTE YOUR LOGO URL OR BASE64 STRING HERE IN CODE:
  src: '', // e.g., "data:image/png;base64,..." or "/logo.png"
  alt: 'Workshop Organization Logo',
  height: 75,
  maxWidth: 280,
};
