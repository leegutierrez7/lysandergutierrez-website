// Centralized feature flags with optional dynamic loading from Vercel Edge Config.
// 1. Default values sourced from environment variables (Vercel dashboard -> Environment Variables)
// 2. If an Edge Config is attached (EDGE_CONFIG env var auto-provided by Vercel),
//    values are lazily fetched once per server instance for runtime toggling WITHOUT a redeploy.

export interface FeatureFlags {
  blogEnabled: boolean
}

// In-memory cache (sync access for existing code paths)
let cachedFlags: FeatureFlags = {
  blogEnabled: process.env.NEXT_PUBLIC_FEATURE_BLOG === 'true',
}

let loadAttempted = false

// Attempt to load dynamic flags from Vercel Edge Config (if available)
async function loadFromEdgeConfig(): Promise<void> {
  if (loadAttempted) return
  loadAttempted = true

  // Guard: only try if Edge Config is configured
  if (!process.env.EDGE_CONFIG) return

  try {
    // Dynamically import to avoid bundling if unused
    const edge = await import('@vercel/edge-config')
    const all = await edge.getAll<Record<string, any>>()

    // Map keys -> internal flags (fallback to existing values if undefined)
    if (all) {
      cachedFlags = {
        blogEnabled:
          typeof all.FEATURE_BLOG === 'boolean'
            ? all.FEATURE_BLOG
            : cachedFlags.blogEnabled,
      }
    }
  } catch (err) {
    // Silently fail and keep env-based defaults
    console.warn(
      '[featureFlags] Edge Config load failed; using env defaults',
      err
    )
  }
}

// Public async loader (can be awaited in layouts / route handlers)
export async function loadFeatureFlags(): Promise<FeatureFlags> {
  await loadFromEdgeConfig()
  return cachedFlags
}

// Sync accessor preserved for existing synchronous utility functions.
export function isBlogEnabled(): boolean {
  return cachedFlags.blogEnabled
}

// Utility to force refresh (e.g., via an on-demand revalidation route if desired)
export async function refreshFeatureFlags(): Promise<FeatureFlags> {
  loadAttempted = false
  await loadFromEdgeConfig()
  return cachedFlags
}
