/**
 * Local-only mode: Firebase is disabled.
 * The app runs entirely with localStorage and does not use Auth/Firestore.
 * These exports are harmless stubs to satisfy any accidental imports.
 */

// Previously: Firebase initialization and providers (removed for local-only mode)

// Safe stubs
export const auth: any = null;
export const db: any = null;
export const googleProvider: any = null;