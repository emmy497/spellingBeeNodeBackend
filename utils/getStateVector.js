// getStateVector.js
export function getStateVector(wordMap, orderedWordList) {
  return orderedWordList.map(word => wordMap[word] || 0);
}
