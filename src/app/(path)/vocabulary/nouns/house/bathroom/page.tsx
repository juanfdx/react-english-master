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

const bathroomItems: HouseItem[] = [
  { id: "shower", word: "Shower" },
  { id: "sink", word: "Sink" },
  { id: "mirror-cabinet", word: "Mirror Cabinet" },
  { id: "toilet", word: "Toilet" },
  { id: "towel-bar", word: "Towel Bar" },
  { id: "showerhead", word: "Showerhead" },
  { id: "bath-mat", word: "Bath Mat" },
  { id: "laundry-basket", word: "Laundry Basket" },
  { id: "shower-curtain", word: "Shower Curtain" },
  { id: "towel", word: "Towel" },
  { id: "toilet-tank", word: "Toilet Tank" }
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
  const [shuffled, setShuffled] = useState<HouseItem[]>(() =>
    shuffleArray(bathroomItems)
  );
  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    if (matches === bathroomItems.length) {
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
      playWord(bathroomItems.find(f => f.id === markerId)?.word || markerId, "male");

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
    setShuffled(shuffleArray(bathroomItems));
    setShowWinScreen(false);
  }



  return (
    <div className="flex flex-col text-slate-900">

      {/* SCORE */}
      <MatchScoreBoard items={bathroomItems} matches={matches} errors={errors} />

      <main className="flex-1 max-w-7xl mx-auto flex flex-col items-center">

        {showWinScreen ? (
          // WIN MESSAGE
          <QuizWinModal title="Vocabulary Master!" errors={errors} resetGame={resetGame} />
          
        ) : (
          <>
            {/* TITLE */}
            <Title
              title="Bathroom"
              subtitle="Inspector"
              description="Tap a word, then tap the correct object."
            />

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
                        ? bathroomItems.find((f) => f.id === m.id)?.word
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