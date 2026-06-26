import type { Language } from '../interfaces/language';
import type { Word } from '../interfaces/word';


/*====================================================================
  FILTER WORDS BY LIST
=====================================================================*/
/**
 * Filters a list of Word objects based on an array of specific word strings.
 * @param targetWords - Array of lowercase strings you want to filter by (e.g., ['fire pit', 'grass'])
 * @param allWords - The master array containing all your Word objects
 * @returns An array of Word objects that match the target words
 */
export const filterWordsByList = (targetWords: string[], allWords: Word[]): Word[] => {
  // Convert target words to lowercase once for better performance
  const lowerCaseTargets = targetWords.map(word => word.toLowerCase().trim());

  return allWords.filter(item => 
    lowerCaseTargets.includes(item.word.toLowerCase().trim())
  );
}


/*====================================================================
  BASIC BROWSER ENGLISH PRONUNCIATION TTS
=====================================================================*/
export const speakWord = (word: string) => {
  if (!("speechSynthesis" in window)) return;

  // 1. Instantly clear any ongoing speech
  window.speechSynthesis.cancel(); 

  const utterance = new SpeechSynthesisUtterance(word);
  
  // CRITICAL FIX: Explicitly set the target language *before* anything else.
  // If voice loading fails or is delayed, the browser at least knows the target language.
  utterance.lang = "en-US"; 
  utterance.rate = 0.8; 
  utterance.pitch = 1;
  utterance.volume = 1;

  const setEnglishVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    
    // Look for preferred English locales
    const englishVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') 
                      || voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
      utterance.lang = englishVoice.lang; 
    }
  };

  // 2. Try to set the voice immediately (if voices are already loaded)
  setEnglishVoice();

  // 3. CRITICAL FIX: If voices haven't loaded yet, wait for them to load
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      setEnglishVoice();
      window.speechSynthesis.speak(utterance);
    };
  } else {
    // Voices were already cached/loaded, just speak it
    window.speechSynthesis.speak(utterance);
  }
};

/*====================================================================
  PLAY ENGLISH WORD AUDIO 
=====================================================================*/
type AudioType = 'words' | 'definitions';

export const playWord = async (
  word: string, 
  gender: 'male' | 'female' | 'effect', 
  language: Language = 'en',
  audioType: AudioType = 'words'
) => {
  // 1. Safe Formatting: "Tropical Fish" -> "tropical-fish"
  const formattedWord = word.toLowerCase().trim().replace(/\s+/g, '-');

  let audioPath;

  if (gender === 'effect') {
    audioPath = `/audio/${language}/${gender}/${formattedWord}.mp3`;
  } else {
    audioPath = `/audio/${language}/${gender}/${audioType}/${formattedWord}.mp3`;
  }
  
  const audio = new Audio(audioPath);

  try {
    await audio.play();
  } catch {
    // If the MP3 file is missing (404) or blocked, trigger the TTS fallback
    console.warn(`MP3 not found at ${audioPath}. Falling back to TTS browser speech.`);
    speakWord(word);
  }
};


/*====================================================================
  FORMAT TO LOWERCASE AND CHANGE SPACES TO DASHES
=====================================================================*/
export const formatToSlug = (word: string) => {
  return word.toLowerCase().replace(/ /g, "-");
}


/*====================================================================
  CHECK IF IS IMAGE
=====================================================================*/
export const isImage = (url: string) => {
  return url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png") || url.endsWith(".webp");
}


/*====================================================================
  SHUFFLE ARRAY
=====================================================================*/
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};


/*====================================================================
  FILTER WORDS BY CATEGORY
=====================================================================*/
export const filterWordsByTypeAndCategory = (allWords: Word[], type: string, category: string): Word[] => {
  return allWords.filter(word => word.type === type && word.category === category);
}


/*====================================================================
  GET RANDOM WORD
=====================================================================*/
export const getRandomWord = (words: Word[]): Word => {
  return words[Math.floor(Math.random() * words.length)];
}