import { useEffect, useState } from "react";
import { playWord, shuffleArray } from '../../../../../../utils/functions';
// components
import { MatchScoreBoard } from '../../../../../../components/ui/MatchScoreBoard';
import { Title } from '../../../../../../components/ui/Title';
import { QuizWinModal } from '../../../../../../components/ui/QuizWinModal';

type HouseItem = {
  id: string;
  word: string;
};

const kitchenItems: HouseItem[] = [
  { id: "refrigerator", word: "Refrigerator" },
  { id: "oven", word: "Oven" },
  { id: "microwave", word: "Microwave" },
  { id: "dishwasher", word: "Dishwasher" },
  { id: "cabinet", word: "Cabinet" },
  { id: "tap", word: "Tap" },
  { id: "countertop", word: "Countertop" },
  { id: "kitchen-island", word: "Kitchen Island" },
  { id: "bar-stools", word: "Bar Stools" },
  { id: "drawers", word: "Drawers" },
  { id: "stove-burners", word: "Stove Burners" },
  { id: "pantry-cabinet", word: "Pantry Cabinet" },
];

const markers = [
  { id: "refrigerator", top: "30%", left: "22.3%" },
  { id: "oven", top: "61.7%", left: "73.5%" },
  { id: "microwave", top: "24.7%", left: "76.7%" },
  { id: "dishwasher", top: "46.5%", left: "59%" },
  { id: "cabinet", top: "16.8%", left: "90%" },
  { id: "tap", top: "44.4%", left: "44.4%" },
  { id: "countertop", top: "56.5%", left: "46%" },
  { id: "kitchen-island", top: "72%", left: "52%" },
  { id: "bar-stools", top: "63.5%", left: "30.8%" },
  { id: "drawers", top: "64.4%", left: "86.4%" },
  { id: "stove-burners", top: "44.7%", left: "77%" },
  { id: "pantry-cabinet", top: "22%", left: "10.5%" },
];


export default function KitchenPage() {

  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [wrongMarker, setWrongMarker] = useState<string | null>(null);
  const [shuffled, setShuffled] = useState<HouseItem[]>(() =>
    shuffleArray(kitchenItems)
  );
  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    if (matches === kitchenItems.length) {
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
      playWord(kitchenItems.find(f => f.id === markerId)?.word || markerId, "male");

    } else {
      playWord('wrong', "effect");
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
    setShuffled(shuffleArray(kitchenItems));
    setShowWinScreen(false);
  }



  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <MatchScoreBoard items={kitchenItems} matches={matches} errors={errors} />

      <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">

        {showWinScreen ? (
          // WIN MESSAGE
          <QuizWinModal title="Vocabulary Master!" errors={errors} resetGame={resetGame} />

        ) : (
          <>
            {/* TITLE */}
            <Title
              title="Kitchen"
              subtitle="Inspector"
              description="Tap a word, then tap the correct object."
            />

            {/* IMAGE AREA */}
            <div className="w-full bg-white rounded-4xl md:rounded-[3rem] p-4 md:p-6 shadow-2xl border border-slate-100 relative mb-12 overflow-hidden">

              <div className="aspect-video w-full rounded-3xl bg-slate-100 border border-slate-200 relative overflow-hidden">

                <img
                  src="/images/nouns/kitchen.webp"
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
                        ? kitchenItems.find((f) => f.id === m.id)?.word
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