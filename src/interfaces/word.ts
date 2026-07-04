
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition';
export type WordCategory = 
 'house' |
 'work' |
 'animal' |
 'clothes' |
 'people' |
 'color' |
 'food' |
 'transport' |
 'weather' | 
 'travel' | 
 'appliance' |
 'body' |
 'general';



export interface Word {
  id: string;
  word: string;
  type: PartOfSpeech; 
  category: WordCategory; 
  definition?: string;
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