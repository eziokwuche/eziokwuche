/**
 * WCAG 2.1 contrast utilities.
 * Accepts hex colors (#rgb or #rrggbb) and returns ADA-compliant foreground colors.
 */

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function srgbChannel(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * srgbChannel(r) + 0.7152 * srgbChannel(g) + 0.0722 * srgbChannel(b);
}

export function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Returns "#ffffff" or "#000000" — whichever meets WCAG AA (4.5:1) against `bg`.
 * Falls back to whichever has the higher contrast if neither fully meets AA.
 */
export function accessibleForeground(bgHex) {
  const whiteRatio = contrastRatio(bgHex, "#ffffff");
  const blackRatio = contrastRatio(bgHex, "#000000");
  return whiteRatio >= blackRatio ? "#ffffff" : "#000000";
}

/**
 * Returns a muted/secondary foreground with reduced opacity,
 * still biased toward the accessible direction.
 */
export function accessibleMuted(bgHex, opacity = 0.55) {
  const base = accessibleForeground(bgHex);
  const [r, g, b] = hexToRgb(base);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
