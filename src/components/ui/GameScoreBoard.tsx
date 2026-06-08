interface Props {
  score: number
  lives: number
  marginBottom?: string
}


export const GameScoreBoard = ({ score, lives, marginBottom = 'mb-0'}: Props) => {

  return (
    <div className={`w-full px-6 py-4 flex justify-end items-center ${marginBottom}`}>
      <div className="flex gap-4 text-xs font-bold">

        <div className="bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">
          Score: {score}
        </div>
  
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="text-xl">
              {i < lives ? "❤️" : "🖤"}
            </span>
          ))}
        </div>
        
      </div>
    </div>
  )
}