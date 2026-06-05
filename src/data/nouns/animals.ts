import type { Category } from '../../interfaces/category';


export const animalsCategories: Category[] = [
  {
    id: "1",
    name: "Flip Cards",
    icon: "🃏",
    href: "flip-cards",
    category: 'nouns',
    level: 'beginner',
  },
  {
    id: "2",
    name: "Kitchen",
    icon: "🍳",
    href: "kitchen",
    category: 'nouns',
    level: 'beginner',
  },

];


export type AnimalType = "land" | "water" | "fly";

export interface Animal {
  name: string;
  icon: string;
  type: AnimalType;
}

// src/data/animals.ts
export const animalData: Animal[] = [
  { name: "Lion", icon: "🦁", type: "land" },
  { name: "Tiger", icon: "🐯", type: "land" },
  { name: "Elephant", icon: "🐘", type: "land" },
  { name: "Shark", icon: "🦈", type: "water" },
  { name: "Dolphin", icon: "🐬", type: "water" },
  { name: "Whale", icon: "🐋", type: "water" },
  { name: "Eagle", icon: "🦅", type: "fly" },
  { name: "Owl", icon: "🦉", type: "fly" },
  { name: "Parrot", icon: "🦜", type: "fly" },
  { name: "Kangaroo", icon: "🦘", type: "land" },
  { name: "Octopus", icon: "🐙", type: "water" },
  { name: "Squid", icon: "🦑", type: "water" },
  { name: "Bat", icon: "🦇", type: "fly" },
  { name: "Crab", icon: "🦀", type: "water" },
  { name: "Lobster", icon: "🦞", type: "water" },
  { name: "Shrimp", icon: "🦐", type: "water" },
  { name: "Oyster", icon: "🦪", type: "water" },
  { name: "Butterfly", icon: "🦋", type: "fly" },
  { name: "Zebra", icon: "🦓", type: "land" },
  { name: "Turtle", icon: "🐢", type: "water" },
  { name: "Fish", icon: "🐟", type: "water" },
  { name: "Tropical Fish", icon: "🐠", type: "water" },
  { name: "Blowfish", icon: "🐡", type: "water" },
  { name: "Dog", icon: "🐶", type: "land" },
  { name: "Cat", icon: "🐱", type: "land" },
  { name: "Rat", icon: "🐀", type: "land" },
  { name: "Bear", icon: "🐻", type: "land" },
  { name: "Snake", icon: "🐍", type: "land" },
  { name: "Giraffe", icon: "🦒", type: "land" },
  { name: "Penguin", icon: "🐧", type: "land" },
  { name: "Panda", icon: "🐼", type: "land" },
  { name: "Crocodile", icon: "🐊", type: "water" },
  { name: "Hippo", icon: "🦛", type: "water" },
  { name: "Duck", icon: "🦆", type: "fly" },
  { name: "Frog", icon: "🐸", type: "water" },
  { name: "Monkey", icon: "🐒", type: "land" },
  { name: "Gorilla", icon: "🦍", type: "land" },
  { name: "Wolf", icon: "🐺", type: "land" },
  { name: "Fox", icon: "🦊", type: "land" },
  { name: "Horse", icon: "🐎", type: "land" },
  { name: "Pony", icon: "🐴", type: "land" },
  { name: "Pig", icon: "🐖", type: "land" },
  { name: "Cow", icon: "🐮", type: "land" },
  { name: "Goat", icon: "🐐", type: "land" },
  { name: "Sheep", icon: "🐑", type: "land" },
  { name: "Deer", icon: "🦌", type: "land" },
  { name: "Camel", icon: "🐫", type: "land" },
  { name: "Rabbit", icon: "🐇", type: "land" },
  { name: "Squirrel", icon: "🐿️", type: "land" },
  { name: "Swan", icon: "🦢", type: "fly" },
  { name: "Flamingo", icon: "🦩", type: "fly" },
  { name: "Peacock", icon: "🦚", type: "fly" },
  { name: "Dove", icon: "🕊️", type: "fly" },
  { name: "Hummingbird", icon: "🐦", type: "fly" },
  { name: "Turkey", icon: "🦃", type: "fly" },
  { name: "Rooster", icon: "🐓", type: "fly" },
  { name: "Chicken", icon: "🐔", type: "fly" },
  { name: "Baby Chick", icon: "🐥", type: "fly" },
  { name: "Bee", icon: "🐝", type: "fly" },
  { name: "Lady Beetle", icon: "🐞", type: "fly" },
  { name: "Mosquito", icon: "🦟", type: "fly" },
  { name: "Cricket", icon: "🦗", type: "fly" },
  { name: "Llama", icon: "🦙", type: "land" },
  { name: "Seal", icon: "/images/nouns/seal.webp", type: "water" },
  { name: "Beaver", icon: "/images/nouns/beaver.png", type: "water" },
];
