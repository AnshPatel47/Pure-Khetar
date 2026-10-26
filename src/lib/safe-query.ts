/**
 * Run a database read without letting a DB hiccup crash the whole page.
 * Logs the failure and returns the fallback so the UI can show an empty state.
 */
export async function safeQuery<T>(label: string, query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error(`[db] ${label} failed:`, error);
    return fallback;
  }
}
