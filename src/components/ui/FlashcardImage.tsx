interface Props {
  src: string
  alt: string
  scale?: number
}


export const FlashcardImage = ({ src, alt, scale = 1 }: Props) => {


  return (
    <div className="w-24 h-24 flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="object-contain"
        style={{
          width: `${96 * scale}px`,
          height: `${96 * scale}px`
        }}
      />
    </div>
  )
}