// Centralized feature flags
// Toggle features on/off without invasive code changes.
// In production, could be wired to environment variables or remote config.

export interface FeatureFlags {
  blogEnabled: boolean
}

export const featureFlags: FeatureFlags = {
  blogEnabled: process.env.NEXT_PUBLIC_FEATURE_BLOG === 'true',
}

export function isBlogEnabled(): boolean {
  return featureFlags.blogEnabled
}
