
interface Props { 
  title: string
  subtitle: string
  description?: string
  marginBottom?: string
}


export const Title = ({ title, subtitle, description, marginBottom = 'mb-6' }: Props) => {

  return (
    <div className={`text-center ${marginBottom}`}>
      <h1 className="text-4xl font-black capitalize">
        The <span className="text-indigo-600">{title}</span> {subtitle}
      </h1>

      {description &&    
        <p className="text-slate-500 text-sm mt-2">
          {description}
        </p>
      }
    </div>
  )
}