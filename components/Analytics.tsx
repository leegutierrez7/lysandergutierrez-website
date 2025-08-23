// This file previously contained a custom Google Analytics implementation.
// It has been deprecated in favor of built-in Vercel Analytics.
// The component is intentionally left empty to avoid import errors
// if any stale references remain in feature branches.

export default function Analytics() {
    if (process.env.NODE_ENV !== 'production') return null
    return null
}
