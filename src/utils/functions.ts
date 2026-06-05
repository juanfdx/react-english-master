
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
  BASIC BROWSER ENGLISH PRONUNCIATION TTS
=====================================================================*/
export const speakWord = (word: string) => {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(word);

  // English voice
  utterance.lang = "en-GB";
  utterance.rate = 0.5; // slightly slower for learning
  utterance.pitch = 1;
  utterance.volume = 1;

  window.speechSynthesis.cancel(); // stop previous speech
  window.speechSynthesis.speak(utterance);
}


/*====================================================================
  PLAY ENGLISH WORD AUDIO 
=====================================================================*/
export const playWord = async (word: string, category: string, voice: string) => {

  const audio = new Audio(`/audio/${voice}/${category}/${word}.mp3`);

  try {
    await audio.play();

  } catch (error) {
    console.warn("MP3 failed, falling back to TTS:", error);
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