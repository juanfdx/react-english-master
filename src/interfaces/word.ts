export interface Word {
  id: string;
  word: string;
  meaning: string;
  example: string;
  level: 'beginner' | 'intermediate' | 'advanced';

  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase';

  category: string; // food, travel, emotions, etc.

  pronunciation?: string;
  audioUrl?: string;
}