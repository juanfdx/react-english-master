import { useEffect, useState } from "react";
import { playWord, shuffleArray } from '../../../../../../utils/functions';

type HouseItem = {
  id: string;
  word: string;
};

const livingRoomItems: HouseItem[] = [
  { id: "sofa", word: "Sofa" },
  { id: "armchair", word: "Armchair" },
  { id: "coffee-table", word: "Coffee Table" },
  { id: "bookshelf", word: "Bookshelf" },
  { id: "tv-stand", word: "TV Stand" },
  { id: "side-table", word: "Side Table" },
  { id: "shelf", word: "Shelf" },
  { id: "rug", word: "Rug" },
  { id: "table-lamp", word: "Table Lamp" },
  { id: "cushions", word: "Cushions" },
  { id: "potted-plant", word: "Potted Plant" },
];

const markers = [
  { id: "sofa", top: "51%", left: "37.5%" },
  { id: "armchair", top: "69.7%", left: "69.7%" },
  { id: "coffee-table", top: "66.7%", left: "42.3%" },
  { id: "bookshelf", top: "26.6%", left: "22.2%" },
  { id: "tv-stand", top: "57%", left: "76.5%" },
  { id: "side-table", top: "62%", left: "19.8%" },
  { id: "shelf", top: "18.4%", left: "80%" },
  { id: "rug", top: "85%", left: "30%" },
  { id: "table-lamp", top: "49%", left: "18.7%" },
  { id: "cushions", top: "50%", left: "51.3%" },
  { id: "potted-plant", top: "48.9%", left: "61.8%" },
];


export default function LivingRoomPage() {

  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wrongMarker, setWrongMarker] = useState<string | null>(null);
  const [shuffled, setShuffled] = useState<HouseItem[]>(() =>
    shuffleArray(livingRoomItems)
  );
  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    if (matches === livingRoomItems.length) {
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
      playWord(livingRoomItems.find(f => f.id === markerId)?.word || markerId, "male");

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
    setShuffled(shuffleArray(livingRoomItems));
    setShowWinScreen(false);
  }



  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <div className="w-full px-6 py-4 flex justify-end items-center">
        <div className="flex gap-4 text-xs font-bold">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full border border-emerald-100">
            Matches: {matches}/{livingRoomItems.length}
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
                The <span className="text-indigo-600">Living Room</span> Inspector
              </h1>

              <p className="text-slate-500 text-sm mt-2">
                Tap a word, then tap the correct object.
              </p>
            </div>

            {/* IMAGE AREA */}
            <div className="w-full bg-white rounded-4xl md:rounded-[3rem] p-4 md:p-6 shadow-2xl border border-slate-100 relative mb-12 overflow-hidden">

              <div className="aspect-video w-full rounded-3xl bg-slate-100 border border-slate-200 relative overflow-hidden">

                <img
                  src="/images/nouns/living-room.webp"
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
                        absolute w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center border-2 font-bold backdrop-blur-xs whitespace-nowrap hover:scale-110 transition
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
                        ? livingRoomItems.find((f) => f.id === m.id)?.word
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
                      {item.word}
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