import { useState } from "react";

type FurnitureItem = {
  id: string;
  label: string;
};

const furnitureNames: FurnitureItem[] = [
  { id: "desk", label: "Desk" },
  { id: "chair", label: "Office Chair" },
  { id: "cabinet", label: "Filing Cabinet" },
  { id: "bookshelf", label: "Bookshelf" },
  { id: "lamp", label: "Desk Lamp" },
];

const markers = [
  { id: "desk", top: "57%", left: "34%" },
  { id: "chair", top: "45%", left: "49.4%" },
  { id: "cabinet", top: "37.5%", left: "86%" },
  { id: "bookshelf", top: "22%", left: "61.3%" },
  { id: "lamp", top: "35%", left: "18.5%" },
];


export default function OfficePage() {

  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [wrongMarker, setWrongMarker] = useState<string | null>(null);
  // This runs only once
  const [shuffled] = useState(() =>
    [...furnitureNames].sort(() => Math.random() - 0.5)
  );

function handleDrop(markerId: string) {
  if (!draggedId) return;

  if (draggedId === markerId) {
    setPlaced((prev) => ({ ...prev, [markerId]: draggedId }));
    setMatches((m) => m + 1);
  } else {
    setErrors((e) => e + 1);

    setWrongMarker(markerId);

    setTimeout(() => {
      setWrongMarker(null);
    }, 500);
  }
}


  
  return (
    <div className="min-h-screen flex flex-col text-slate-900">
      {/* SCORE */}
      <div className="w-full px-6 py-4 flex justify-end items-center">
        <div className="flex gap-4 text-xs font-bold">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full border border-emerald-100">
            Matches: {matches}/5
          </div>
          <div className="bg-rose-50 text-rose-700 px-4 py-1 rounded-full border border-rose-100">
            Errors: {errors}
          </div>
        </div>
      </div>
     
      <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">
        {/* TITLE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black">
            The <span className="text-indigo-600">Office</span> Inspector
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Drag the furniture names onto the correct objects.
          </p>
        </div>

        {/* IMAGE AREA */}
        <div className="w-full bg-white rounded-4xl md:rounded-[3rem] p-4 md:p-6 shadow-2xl shadow-slate-200/60 border border-slate-100 relative mb-12 overflow-hidden">
          <div className="aspect-video w-full rounded-3xl bg-slate-100 border border-slate-200 relative overflow-hidden flex items-center justify-center text-slate-300">
            <img
              src="/images/nouns/office.png"
              alt="office"
              className="w-full h-full object-cover"
            />

            {/* MARKERS */}
            {markers.map((m) => {
              const isPlaced = placed[m.id];
              const isWrong = wrongMarker === m.id;

              return (
                <div
                  key={m.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(m.id)}
                  className={`absolute w-12 h-12 rounded-full flex items-center justify-center  border-2 font-bold backdrop-blur-xs whitespace-nowrap hover:scale-110 transition ${
                    isPlaced
                      ? "correct-match"
                      : "bg-white/70 border-dashed border-white text-indigo-600"
                  }
                    ${isWrong ? "wrong-match" : ""}
                  `}
                  style={{ top: m.top, left: m.left }}
                >
                  {isPlaced
                    ? furnitureNames.find((f) => f.id === m.id)?.label
                    : "?"}
                </div>
              );
            })}
          </div>
        </div>

        {/* VOCABULARY BANK */}
        <div className="sm:mt-10 w-full max-w-4xl bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
          <h3 className="text-center text-indigo-900 font-bold mb-6 text-sm uppercase tracking-widest">
            Vocabulary Bank
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {shuffled.map((item) => {
              const isHidden = Object.values(placed).includes(item.id);

              if (isHidden) return null;

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedId(item.id)}
                  className="bg-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing font-bold text-indigo-600 border border-indigo-100 hover:scale-105 transition active:scale-95"
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* WIN MESSAGE */}
        {matches === furnitureNames.length && (
          <div className="mt-10 text-center bg-white p-10 rounded-3xl shadow-xl border">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-3xl font-black mb-2">
              Vocabulary Master!
            </h2>
            <p className="text-slate-500 mb-6">
              You finished with {errors} mistakes.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
            >
              Play Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}