
interface Props {
  items: unknown[];
  matches: number;
  errors: number;
  marginBottom?: string
}


export const MatchScoreBoard = ({ items, matches, errors, marginBottom = 'mb-0' }: Props) => {

  return (
    <div className={`w-full px-6 py-4 flex justify-end items-center ${marginBottom}`}>
      <div className="flex gap-4 text-xs font-bold">

        <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full border border-emerald-100">
          Matches: {matches}/{items.length}
        </div>

        <div className="bg-rose-50 text-rose-700 px-4 py-1 rounded-full border border-rose-100">
          Errors: {errors}
        </div>

      </div>
    </div>
  )
}