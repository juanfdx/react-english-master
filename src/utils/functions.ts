import type { Word } from '../interfaces/word';

/*====================================================================
  SHUFFLE FOR VOCABULARY BANK
=====================================================================*/
export const shuffle = <T>(array: T[]) => {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}


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

  const utterance = new SpeechSynthesisUtterance(word);

  // Clear previous speech instantly
  window.speechSynthesis.cancel(); 

  // Helper to find and set the English voice
  const setEnglishVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    
    // Look for a high-quality English voice (US or GB)
    // You can prioritize 'en-US' or 'en-GB' if you prefer one over the other
    const englishVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB') 
                      || voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
      utterance.lang = englishVoice.lang; // Match the exact tongue of the voice
    } else {
      utterance.lang = "en-US"; // Absolute fallback configuration
    }
  };

  // Run it immediately
  setEnglishVoice();

  utterance.rate = 0.8; // Clear and slightly slower, but natural
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};


/*====================================================================
  PLAY ENGLISH WORD AUDIO 
=====================================================================*/
export const playWord = async (word: string, gender: 'male' | 'female') => {
  // 1. Safe Formatting: "Tropical Fish" -> "tropical_fish"
  const formattedWord = word.toLowerCase().trim().replace(/\s+/g, '-');
  
  const audioPath = `/audio/${gender}/${formattedWord}.mp3`;
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