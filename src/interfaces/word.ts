
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition';
export type WordCategory = 
 'house' |
 'work' |
 'animal' |
 'clothes' |
 'color' |
 'food' | 
 'travel' | 
 'appliance' |
 'general';



export interface Word {
  id: string;
  word: string;
  type: PartOfSpeech; 
  category: WordCategory; 
  tags?: string[];
  icon?: string; // URL or icon identifier
  image?: string; // URL to an illustration/photo
  svg?: string;
  scale?: number;
  conjugations?: { 
    past?: string; 
    participle?: string; 
  };
} 