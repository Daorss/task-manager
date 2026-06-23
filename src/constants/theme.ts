// Soft depth shared by raised surfaces (task cards, progress card, quote card).
// Uses `boxShadow` (RN 0.85 / New Architecture) instead of Android `elevation`:
// it's rendered by RN so it fades smoothly with opacity during animations and
// isn't flagged by Reanimated layout animations.
export const cardShadow = {
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
} as const;
