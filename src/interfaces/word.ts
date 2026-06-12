
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition';
export type WordCategory = 
 'house' |
 'work' |
 'animal' |
 'color' |
 'food' | 
 'travel' | 
 'appliance' |
 'general';


 export type WordTag = 
  | 'land' | 'fly' | 'water'           // Animals
  | 'indoor' | 'outdoor'               // Location context
  | 'office' | 'career' | 'tools';     // Work filters


export interface Word {
  id: string;
  word: string;
  type: PartOfSpeech; 
  category: WordCategory; 
  tags?: string[];
  icon?: string; // URL or icon identifier
  image?: string; // URL to an illustration/photo
  svg?: string;
  conjugations?: { 
    past?: string; 
    participle?: string; 
  };
} 