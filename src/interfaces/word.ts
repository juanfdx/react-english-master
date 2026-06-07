
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition';
export type WordCategory = 
 'house' |
 'food' | 
 'travel' | 
 'emotions' |
 'land' | 
 'fly' | 
 'water' |
 'movement' |
 'people' |
 'body' |
 'nature' |
 'time' |
 'business' |
 'transport' |
 'general';



export interface Word {
  id: string;
  word: string;
  type: PartOfSpeech; 
  category: WordCategory; 
  icon?: string; // URL or icon identifier
  image?: string; // URL to an illustration/photo
  conjugations?: { 
    past?: string; 
    participle?: string; 
  };
} 