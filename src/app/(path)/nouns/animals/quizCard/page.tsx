import { useMemo, useState } from "react";
import { shuffleArray } from '../../../../../utils/functions';

type Animal = {
  name: string;
  icon: string;
};

const animalData: Animal[] = [
  { name: "Lion", icon: "🦁" },
  { name: "Tiger", icon: "🐯" },
  { name: "Elephant", icon: "🐘" },
  { name: "Giraffe", icon: "🦒" },
  { name: "Monkey", icon: "🐒" },
  { name: "Penguin", icon: "🐧" },
  { name: "Panda", icon: "🐼" },
  { name: "Fox", icon: "🦊" },
];

export default function QuizCardPage() {

  const [current, setCurrent] = useState<Animal>(getRandomAnimal());
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [flipped, setFlipped] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function getRandomAnimal(): Animal {
    return animalData[Math.floor(Math.random() * animalData.length)];
  }

  const options = useMemo(() => {
    const wrong = animalData
      .filter((a) => a.name !== current.name)
      .slice(0, 3);

    return shuffleArray([current, ...wrong]).map((a) => a.name);
  }, [current]);

  const handleAnswer = (name: string) => {
    setSelected(name);
    setFlipped(true);

    const isCorrect = name === current.name;

    setTimeout(() => {
      if (isCorrect) {
        setScore((s) => s + 10);
      } else {
        setLives((l) => l - 1);
      }

      nextQuestion();
    }, 900);
  };

  const nextQuestion = () => {
    setFlipped(false);
    setSelected(null);
    setCurrent(getRandomAnimal());
  };

  if (lives <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h1 className="text-3xl font-black mb-2">Game Over</h1>
          <p className="text-slate-500 mb-6">Score: {score}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center py-10">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black">
          Animal <span className="text-indigo-600">Mastery</span>
        </h1>

        <div className="flex gap-6 justify-center mt-3 text-sm text-slate-600">
          <div className="bg-indigo-50 px-4 py-1 rounded-full">
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

      {/* Flip Card */}
      <div className="perspective w-64 h-64 mb-10">
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl flex items-center justify-center text-8xl">
            {current.icon}
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-indigo-600 rounded-3xl shadow-xl flex items-center justify-center text-white text-2xl font-bold">
            {selected === current.name ? "✓ Correct!" : "✗ Wrong!"}
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        {options.map((opt) => {
          const isSelected = selected === opt;

          return (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              disabled={!!selected}
              className={`
                py-4 px-6 rounded-2xl font-bold border-2 transition-all
                shadow-sm active:scale-95
                ${
                  isSelected
                    ? opt === current.name
                      ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                      : "bg-rose-50 border-rose-500 text-rose-600"
                    : "bg-white border-slate-100 hover:border-indigo-500 hover:text-indigo-600"
                }
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}