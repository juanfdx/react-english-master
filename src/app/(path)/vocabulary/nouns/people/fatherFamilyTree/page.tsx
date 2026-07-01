import { playWord } from "../../../../../../utils/functions";
// components
import { Title } from "../../../../../../components/ui/Title";

const familyMembers = [
  { id: "father", word: "father", top: "24.5%", left: "48.2%" },
  { id: "mother", word: "mother", top: "24.5%", left: "60.2%" },

  { id: "stepbrother", word: "stepbrother", top: "50.5%", left: "33%" },

  { id: "sister", word: "sister", top: "50.5%", left: "65.5%" },
  { id: "brother-in-law", word: "brother in law", top: "50.5%", left: "77.3%" },

  { id: "son", word: "son", top: "71.5%", left: "41.7%" },
  { id: "daughter", word: "daughter", top: "72%", left: "54.2%" },

  { id: "niece", word: "niece", top: "71.5%", left: "67.9%" },
  { id: "nephew", word: "nephew", top: "71.5%", left: "77.9%" },

  { id: "grandson", word: "grandson", top: "93.5%", left: "34.4%" },
  { id: "granddaughter", word: "granddaughter", top: "93.5%", left: "45.3%" },

  { id: "grandson-2", word: "grandson", top: "93.5%", left: "57%" },
  { id: "granddaughter-2", word: "granddaughter", top: "93.5%", left: "68%" },
];



export default function PeopleFatherFamilyTreePage() {

  function handleMarkerClick(word: string) {
    playWord(word, "male");
  }


  return (
    <div className="flex flex-col text-slate-900">
      <main className="max-w-7xl mx-auto w-full py-12">

        <Title
          title="Father Family Tree"
          subtitle="Explorer"
          description="Click a family member to hear the word."
        />

        <div className="bg-white rounded-4xl p-4 md:p-6 shadow-xl border border-slate-100">

          <div className="relative aspect-video overflow-hidden rounded-3xl">

            <img
              src="/images/nouns/people/complex-family-tree.webp"
              alt="Family Tree"
              className="w-full h-full object-cover"
            />

            {familyMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleMarkerClick(member.word)}
                className="
                  absolute
                  -translate-x-1/2
                  -translate-y-1/2
                  w-8 h-7 md:w-11 md:h-9 lg:w-20 lg:h-14    
              
                  cursor-pointer
                  group
                "
                style={{
                  top: member.top,
                  left: member.left,
                }}
              >
              </button>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}