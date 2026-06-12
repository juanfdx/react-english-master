import type { Category } from '../../interfaces/category';


export const houseCategories: Category[] = [
  {
    id: "2",
    name: "Kitchen Inspector",
    icon: "🍳",
    href: "kitchen",
    type: "noun",
    domain: 'house',
    activity_type: 'inspector',
    level: 'beginner',
  },
  {
    id: "3",
    name: "Bedroom Inspector",
    icon: "🛏️",
    href: "bedroom",
    type: "noun",
    domain: 'house',
    activity_type: 'inspector',
    level: 'beginner',
  },
  {
    id: "4",
    name: "Living Room Inspector",
    icon: "🛋️",
    href: "living-room",
    type: "noun",
    domain: 'house',
    activity_type: 'inspector',
    level: 'beginner',
  },
  {
    id: "5",
    name: "Bathroom Inspector",
    icon: "🚽",
    href: "bathroom",
    type: "noun",
    domain: 'house',
    activity_type: 'inspector',
    level: 'beginner',
  },
  {
    id: "6",
    name: "Laundry Room Inspector",
    icon: "🧺",
    href: "laundry-room",
    type: "noun",
    domain: 'house',
    activity_type: 'inspector',
    level: 'beginner',
  },
  {
    id: "7",
    name: "Backyard Inspector",
    icon: "🌳",
    href: "backyard",
    type: "noun",
    domain: 'house',
    activity_type: 'inspector',
    level: 'beginner',
  },
  {
    id: "8",
    name: "Flip Cards",
    icon: "🃏",
    href: "flip-cards",
    type: 'noun',
    domain: 'house',
    activity_type: 'flip-cards',
    level: 'beginner',
  },
  {
    id: "9",
    name: "Card Quiz",
    icon: "🎯",
    href: "quiz-card",
    type: "noun",
    domain: 'house',
    activity_type: 'quiz',
    level: 'beginner',
  },
  {
    id: "10",
    name: "Audio Quiz",
    icon: "🔊",
    href: "audio-quiz",
    type: "noun",
    domain: 'house',
    activity_type: 'quiz',
    level: 'beginner',
  },
];



export type ApplianceType = "kitchen" | "cooling" | "heating" | "laundry" | "cleaning" | "bathroom" | "bedroom" | "living-room" | "backyard" | "time" | "outdoor";

export interface Animal {
  name: string;
  icon: string;
  type: ApplianceType;
}
