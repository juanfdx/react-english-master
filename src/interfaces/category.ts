import type { Level } from './levels';
type ActivityType =
  | "flip-cards"
  | "quiz"
  | "matching"
  | "inspector"
  | "listening";

export interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
  type: string, // noun, verb, adjective
  domain: string,  // furniture, animals...
  activity_type?: ActivityType,  
  level?: Level
}