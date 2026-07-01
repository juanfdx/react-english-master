import { playWord } from "../../../../../../utils/functions";
// components
import { Title } from "../../../../../../components/ui/Title";

const familyMembers = [
  { id: "grandfather", word: "grandfather", top: "32%", left: "42.7%" },
  { id: "grandmother", word: "grandmother", top: "32%", left: "56.2%" },

  { id: "father", word: "father", top: "60.3%", left: "25.3%" },
  { id: "mother", word: "mother", top: "60.3%", left: "41.7%" },

  { id: "aunt", word: "aunt", top: "60.3%", left: "61%" },
  { id: "uncle", word: "uncle", top: "60.3%", left: "75.5%" },

  { id: "sister", word: "sister", top: "88.4%", left: "23.8%" },
  { id: "brother", word: "brother", top: "88.4%", left: "35.8%" },

  { id: "son", word: "son", top: "88.4%", left: "47.6%" },
  { id: "cousin", word: "cousin", top: "88.4%", left: "68.1%" },
];



export default function PeopleFamilyTreePage() {

  function handleMarkerClick(word: string) {
    playWord(word, "male");
  }


  return (
    <div className="flex flex-col text-slate-900">
      <main className="max-w-7xl mx-auto w-full py-12">

        <Title
          title="Son Family Tree"
          subtitle="Explorer"
          description="Click a family member to hear the word."
        />

        <div className="bg-white rounded-4xl p-4 md:p-6 shadow-xl border border-slate-100">

          <div className="relative aspect-video overflow-hidden rounded-3xl">

            <img
              src="/images/nouns/people/basic-family-tree.webp"
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
                  w-7 h-6  md:w-9 md:h-8 lg:w-10 lg:h-10                 
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