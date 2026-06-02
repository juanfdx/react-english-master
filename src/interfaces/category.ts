import type { Level } from './levels';
// type CategoryType = 'nouns' | 'verbs' | 'adjectives';

export interface Category {
  id: string;
  name: string;
  icon: string;
  href: string;
  category?: string // nouns, verbs, adjectives
  level?: Level
}