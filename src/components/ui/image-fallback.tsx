import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

const ImageFallback = (props: ImageProps) => {
  const [src, setSrc] = useState(props.src)

  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc('/fallback.png')}
      alt={props.alt}
    />
  )
}

export default ImageFallback
