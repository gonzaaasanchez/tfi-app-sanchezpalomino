import { useState, useCallback } from 'react'

type UseFullscreenImageReturn = {
  isModalVisible: boolean
  selectedImageUri: string | null
  openImageModal: (imageUri: string) => void
  closeImageModal: () => void
}

const useFullscreenImage = (): UseFullscreenImageReturn => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null)

  const openImageModal = useCallback((imageUri: string) => {
    setSelectedImageUri(imageUri)
    setIsModalVisible(true)
  }, [])

  const closeImageModal = useCallback(() => {
    setIsModalVisible(false)
    setSelectedImageUri(null)
  }, [])

  return {
    isModalVisible,
    selectedImageUri,
    openImageModal,
    closeImageModal,
  }
}

export { useFullscreenImage } 