interface Props {
  score: number
  lives: number
  marginBottom?: string
}


export const GameScoreBoard = ({ score, lives, marginBottom = 'mb-0'}: Props) => {

  return (
    <div className={`w-full px-6 py-4 flex justify-end items-center ${marginBottom}`}>
      <div className="flex gap-4 text-xs font-bold">

        <div className="flex items-center bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100">
          <span className="text-xs font-bold text-indigo-400 mr-2">Score:</span>
          <span className='text-sm font-black text-indigo-600 tracking-tighter'>{score}</span>
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