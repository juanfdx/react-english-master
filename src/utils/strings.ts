
/*====================================================================
  CAPITALIZE STRING
=====================================================================*/
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


/*====================================================================
  CAPITALIZE ALL WORDS
=====================================================================*/
export const capitalizeAllWords = (str: string) => {
  return str.split(' ').map(capitalize).join(' ');
};