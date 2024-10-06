import offensiveWordsObj from './offensive-words-obj'

/**
 * Censors a given word by replacing it with its censored version
 * if it exists in the profanity list.
 *
 * @param {string} word - The word to be censored.
 * @returns {string} - The censored version of the word if found; otherwise, the original word.
 */
function censorWord(word) {
    return offensiveWordsObj[word.toLowerCase()] || word;
}

/**
 * Censors all profanity in the given text and returns the new text.
 * @param {string} text - The text to check for and censor profanity.
 * @returns {string} - The text with profanity censored.
 */
export default function censorTextFilter(text) {
    const words = text.split(' ');
    const censoredText = words.map(word => censorWord(word)).join(' ');
    return censoredText;
}