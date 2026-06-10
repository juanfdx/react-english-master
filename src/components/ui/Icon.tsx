import { DropsIcon } from '../icons/DropsIcon'

type Props = {
  type: string
  className: string
  strokeColor?: string
}


export const Icon = ({ type, className, strokeColor }: Props) => {
  return (
    <>
      {(type === 'drops') &&
        <DropsIcon 
          width={32}
          height={32}
          fill="currentColor"
          className={className}
          strokeColor={strokeColor}
        /> 
      }
    </>
  )
}