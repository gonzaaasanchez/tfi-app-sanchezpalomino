/**
 * Represents a user model with optional id and token properties.
 *
 * @property {string} [id] - The user's ID.
 * @property {string} [token] - The user's token.
 */
type UserModel = {
  id?: string
  token?: string
}

export { UserModel }
