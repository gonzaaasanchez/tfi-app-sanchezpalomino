import LottieView from 'lottie-react-native'
import { useRef } from 'react'

type AnimatedViewProps = {
  filePath: string
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({ filePath }) => {
  const animation = useRef<LottieView>(null)

  return (
    <LottieView
      autoPlay={true}
      ref={animation}
      style={{
        width: 200,
        height: 200,
      }}
      source={filePath}
    />
  )
}
