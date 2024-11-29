const DateUtils = {
  MMDDYYYY: (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  },
  prettyLongFormat: (dateString: string) => {
    const date = new Date(dateString)
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
    const [day, month, year] = formattedDate.split(' de ')
    return `${day} de ${month.charAt(0).toUpperCase()}${month.slice(1)}, ${year}`
  },
}

export { DateUtils }
