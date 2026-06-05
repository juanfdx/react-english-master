import { useEffect, useState } from "react";
import { playWord, shuffle } from "../../../../../utils/functions";

type FurnitureItem = {
  id: string;
  label: string;
  word?: string;
};

const furnitureNames: FurnitureItem[] = [
  { id: "shower", label: "Shower", word: "shower" },
  { id: "sink", label: "Sink", word: "sink" },
  { id: "mirror-cabinet", label: "Mirror Cabinet", word: "mirror-cabinet" },
  { id: "toilet", label: "Toilet", word: "toilet" },
  { id: "towel-bar", label: "Towel Bar", word: "towel-bar" },
  { id: "showerhead", label: "Showerhead", word: "showerhead" },
  { id: "bath-mat", label: "Bath Mat", word: "bath-mat" },
  { id: "laundry-basket", label: "Laundry Basket", word: "laundry-basket" },
  { id: "shower-curtain", label: "Shower Curtain", word: "shower-curtain" },
  { id: "towel", label: "Towel", word: "towel" },
  { id: "toilet-tank", label: "Toilet Tank", word: "toilet-tank" }
];

const markers = [
  { id: "shower", top: "35%", left: "52%" },
  { id: "sink", top: "59%", left: "28%" },
  { id: "mirror-cabinet", top: "25%", left: "24%" },
  { id: "toilet", top: "74.5%", left: "85.6%" },
  { id: "towel-bar", top: "36%", left: "64%" },
  { id: "showerhead", top: "13%", left: "52%" },
  { id: "bath-mat", top: "91.8%", left: "45.5%" },
  { id: "laundry-basket", top: "86%", left: "64.5%" },
  { id: "shower-curtain", top: "45%", left: "41%" },
  { id: "towel", top: "51%", left: "64%" },
  { id: "toilet-tank", top: "65%", left: "77%" }
];

export default function BathroomPage() {

  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wrongMarker, setWrongMarker] = useState<string | null>(null);
  const [shuffled, setShuffled] = useState<FurnitureItem[]>(() =>
    shuffle(furnitureNames)
  );
  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    if (matches === furnitureNames.length) {
      const timer = setTimeout(() => {
        setShowWinScreen(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [matches]);


  function handleMarkerClick(markerId: string) {
    if (!selectedWord) return;
    if (placed[markerId]) return;

    if (selectedWord === markerId) {
      setPlaced((prev) => ({
        ...prev,
        [markerId]: selectedWord,
      }));

      setMatches((m) => m + 1);
      setSelectedWord(null);

      // 🗣️ PRONUNCIATION
      playWord(furnitureNames.find(f => f.id === markerId)?.word || markerId, "nouns", "male");

    } else {
      setErrors((e) => e + 1);

      setWrongMarker(markerId);
      setTimeout(() => setWrongMarker(null), 500);
    }
  }

  function resetGame() {
    setMatches(0);
    setErrors(0);
    setPlaced({});
    setSelectedWord(null);
    setWrongMarker(null);
    setShuffled(shuffle(furnitureNames));
    setShowWinScreen(false);
  }



  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <div className="w-full px-6 py-4 flex justify-end items-center">
        <div className="flex gap-4 text-xs font-bold">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full border border-emerald-100">
            Matches: {matches}/{furnitureNames.length}
          </div>
          <div className="bg-rose-50 text-rose-700 px-4 py-1 rounded-full border border-rose-100">
            Errors: {errors}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">

        {showWinScreen ? (
          // WIN MESSAGE
          <div className="mt-10 sm:mt-14 text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-3xl font-black mb-2">
              Vocabulary Master!
            </h2>
            <p className="text-slate-500 mb-6">
              You finished with {errors} mistakes.
            </p>

            <button
              onClick={resetGame}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
            >
              Play Again
            </button>
          </div>

        ) : (
          <>
            {/* TITLE */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-black">
                The <span className="text-indigo-600">Bathroom</span> Inspector
              </h1>

              <p className="text-slate-500 text-sm mt-2">
                Tap a word, then tap the correct object.
              </p>
            </div>

            {/* IMAGE AREA */}
            <div className="w-full bg-white rounded-4xl md:rounded-[3rem] p-4 md:p-6 shadow-2xl border border-slate-100 relative mb-12 overflow-hidden">

              <div className="aspect-video w-full rounded-3xl bg-slate-100 border border-slate-200 relative overflow-hidden">

                <img
                  src="/images/nouns/bathroom.webp"
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
                      onClick={() => handleMarkerClick(m.id)}
                      className={`
                        absolute w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border-2 font-bold backdrop-blur-xs whitespace-nowrap hover:scale-110 transition
                        ${
                          isPlaced
                            ? "correct-match text-xs md:text-base lg:text-xl"
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
            <div className="w-full max-w-4xl bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h3 className="text-center text-indigo-900 font-bold mb-6 text-sm uppercase tracking-widest">
                Vocabulary Bank
              </h3>

              <div className="flex flex-wrap justify-center gap-3">
                {shuffled.map((item) => {
                  
                  const isHidden = Object.values(placed).includes(item.id);

                  const isSelected = selectedWord === item.id;

                  if (isHidden) return null;

                  return (
                    <div
                      key={item.id}
                      onClick={() =>setSelectedWord(item.id)}
                      className={`
                          relative
                          bg-white
                          text-sm md:text-base px-4 md:px-6 py-2 md:py-3
                          rounded-xl shadow-md cursor-pointer
                          font-bold text-indigo-600 border transition
                        ${
                          isSelected
                            ? "scale-105 "
                            : "border-indigo-100 hover:scale-105"
                        }
                      `}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}