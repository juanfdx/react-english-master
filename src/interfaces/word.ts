export interface Word {
  id: string;
  word: string;
  type: string; // noun, verb, adjective
  category: string; // food, travel, emotions, etc.
  icon?: string;
  image?: string;
  audio?: {
    male?: string;
    female?: string;
  };
}