import type { Category } from '../../interfaces/category';


export const colorCategories: Category[] = [
  {
    id: "1",
    name: "Flip Cards",
    icon: "🃏",
    href: "flip-cards",
    type: "noun",
    domain: 'colors',
    activity_type: 'flip-cards',
    level: 'beginner',
  },
  {
    id: "2",
    name: "Card Quiz",
    icon: "🎯",
    href: "quiz-card",
    type: "noun",
    domain: 'colors',
    activity_type: 'quiz',
    level: 'beginner',
  },
  {
    id: "3",
    name: "Audio Quiz",
    icon: "🔊",
    href: "audio-quiz",
    type: "noun",
    domain: 'colors',
    activity_type: 'quiz',
    level: 'beginner',
  },
];