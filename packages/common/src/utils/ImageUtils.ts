/**
 * Convierte una URL relativa o absoluta de imagen en una URL completa
 * @param imagePath - La ruta de la imagen (puede ser relativa o absoluta)
 * @param baseUrl - La URL base del servidor
 * @returns La URL completa de la imagen
 */
export const getImageFullUrl = (
  imagePath: string | null | undefined,
  baseUrl: string
): string => {
  if (!imagePath) {
    return ''
  }

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  return `${baseUrl}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`
}
