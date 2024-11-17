/**
 * Represents the state of a user interface.
 *
 * @property {boolean} loading - Indicates whether the UI is in a loading state or not.
 * @property {string | null} error - Represents the error message associated with the UI state. It can be a string or null.
 */
type UIState = {
  loading: boolean
  error: string | null
}

export { UIState }
