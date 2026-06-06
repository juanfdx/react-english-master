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
];