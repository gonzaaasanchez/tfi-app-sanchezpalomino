export const getMimeType = (uri: string): string => {
  if (!uri) {
    return 'image/jpeg'
  }
  
  const extension = uri.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'gif':
      return 'image/gif'
    case 'webp':
      return 'image/webp'
    case 'heic':
    case 'heif':
      return 'image/heic'
    case 'bmp':
      return 'image/bmp'
    case 'tiff':
    case 'tif':
      return 'image/tiff'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'image/jpeg'
  }
}

export const getFileName = (uri: string, prefix: string = 'file'): string => {
  if (!uri) {
    return `${prefix}.jpg`
  }
  
  const extension = uri.split('.').pop()?.toLowerCase() || 'jpg'
  return `${prefix}.${extension}`
}

export const createFileInfo = (uri: string, prefix: string = 'file') => {
  if (!uri) {
    throw new Error('Se requiere una URI para crear la información del archivo')
  }
  
  return {
    uri,
    type: getMimeType(uri),
    name: getFileName(uri, prefix)
  }
}

export const isValidImageUri = (uri: string): boolean => {
  if (!uri) return false
  
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'heif', 'bmp', 'tiff', 'tif', 'svg']
  const extension = uri.split('.').pop()?.toLowerCase()
  
  return validExtensions.includes(extension || '')
} 