// client/src/utils/weatherUtils.js
import clearIcon from '../assets/clear-icon.png';
import cloudIcon from '../assets/cloud-icon.png';
import rainIcon from '../assets/rain-icon.png';
//import defaultIcon from '../assets/default-icon.png';

export const getWeatherIcon = (description) => {
  // Example: Add more conditions and icons based on your requirements
  if (description.includes('clear')) {
    return clearIcon;
  } else if (description.includes('cloud')) {
    return cloudIcon;
  } else if (description.includes('rain')) {
    return rainIcon;
  } else {
    // Default icon for unknown conditions
    return "";
  }
};
