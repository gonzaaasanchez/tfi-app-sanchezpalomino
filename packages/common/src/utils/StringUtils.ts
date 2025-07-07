const StringValidator = {
  isValidId: (id: string) => {
    return id != '' && /^\d{7,8}$/.test(id)
  },

  isValidEmail: (email: string) => {
    return (
      email != '' &&
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
      !email.includes(' ')
    )
  },

  hasUpperCase: (password: string) => {
    return /[A-Z]/.test(password)
  },

  hasLowerCase: (password: string) => {
    return /[a-z]/.test(password)
  },

  hasValidLength: (password: string) => {
    return password.length >= 6 && password.length <= 24
  },

  paasswordMatch: (password: string, repeatPassword: string) => {
    return (
      StringValidator.hasValidLength(password) &&
      StringValidator.hasValidLength(repeatPassword) &&
      password === repeatPassword
    )
  },

  isValidPassword: (password: string) => {
    return (
      password != '' &&
      // StringValidator.hasLowerCase(password) &&
      // StringValidator.hasUpperCase(password) &&
      StringValidator.hasValidLength(password)
    )
  },

  isEmpty: (str: string): boolean => str.trim() === '',
}

export { StringValidator }
