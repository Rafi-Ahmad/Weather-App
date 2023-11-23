 // historyUtils.js
const MAX_HISTORY_LENGTH = 5; // Maximum number of entries in the history

let history = []; // Array to store the history

export const addToHistory = (location, prevHistory) => {
  // If previous history is provided, use it; otherwise, use the module-scoped history
  const currentHistory = prevHistory || history;

  // Ensure the location is not already in the history
  if (!currentHistory.includes(location)) {
    // Add the location to the history
    currentHistory.push(location);

    // Trim the history if it exceeds the maximum length
    if (currentHistory.length > MAX_HISTORY_LENGTH) {
      currentHistory.shift(); // Remove the oldest entry
    }

    // Return the updated history
    return currentHistory;
  }

  // If the location is already in the history, return the existing history
  return currentHistory;
};
