interface Props {
  src: string
  alt: string
  category?: string
}

const categoryClasses: Record<string, string> = {
  food: 'w-18 h-18',
  default: 'w-22 h-22',
}



export const FlashcardImage = ({ src, alt, category = 'default' }: Props) => {

  const className = categoryClasses[category] ?? categoryClasses.default

  return <img src={src} alt={alt} className={className} />
}