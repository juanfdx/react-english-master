export interface Path {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  href: string;
}



export const paths: Path[] = [
  {
    id: '56e8a64a-7250-4819-a052-c7ff78b6e308',
    title: "Vocabulary",
    description:
      "Learn the most common English words used in daily conversations and real-life situations.",
    icon: "📚",
    color: "bg-purple-100",
    href: "/vocabulary",
  },
  {
    id: '51f106cf-02e6-4f6f-b954-55c482ee1028',
    title: "Grammar",
    description:
      "Master sentence structure, verbs, present, past, and future tenses step by step.",
    icon: "✍️",
    color: "bg-sky-100",
    href: "/grammar",
  },
  {
    id: '7c1a5855-7259-495f-b80e-7ec24a5e347b',
    title: "Nouns",
    description:
      "Understand how nouns, verbs, adjectives, and pronouns work in English.",
    icon: "🏷️",
    color: "bg-amber-100",
    href: "/nouns",
  },
  {
    id: '230d2fa4-47b8-490a-9f15-0bad018f164d',
    title: "Verbs",
    description:
      "Learn English with quizzes, memory games, challenges, and fun activities.",
    icon: "🏃",
    color: "bg-rose-100",
    href: "/verbs",
  },
];