# Weather App
![image](https://github.com/Rafi-Ahmad/Weather-App/assets/102521490/51562481-8f84-46b4-ad6f-97e39780eec3)


## Overview

The Weather App is a web application that allows users to get weather information for different locations. Users can select a country and city to view current weather conditions and a 5-day forecast.

## Features

- **Country and City Selection:** Choose a country from a dropdown list and select a city within that country to get weather information.

- **Weather Display:** View the current temperature, weather description, and an icon representing the current weather conditions.

- **5-Day Forecast:** Check the weather forecast for the next 5 days, including temperature and weather description.

- **Location History:** Keep track of previously searched locations.

- **User Authentication:** Log in or sign up to personalize your experience and access additional features.

## Technologies Used

- React
- Axios
- Styled Components
- React Select
- Country Flag Emoji JSON
- Cities.json
- express
- mongoose

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app

   
## Install dependencies:
1. **Install dependencies on client **
- cd client
- npm install
- Run the application:

- npm start
- The app will be available at http://localhost:3000.

2. **Install dependencies on server **
- cd server
- npm install
- Run the application:

- npm start
- The app will be available at http://localhost:5000.

## Configuration

1. **Environment Variables:**

   Create a `.env` file in the root of the project with the following content:

   ```dotenv
   PORT=5000
   ATLAS_URI=your_mongodb_atlas_uri
   API_KEY=your_weather_api_key


## Usage
Select Country and City:

Choose a country from the first dropdown.
Once a country is selected, the city dropdown will be enabled.
Choose a city from the second dropdown.
Fetch Weather:

Click the "Get Weather" button to fetch weather information.
View Results:

Current weather information, including temperature and description, will be displayed.
If available, a 5-day forecast will also be shown.
User Authentication:

Optionally log in or sign up to access personalized features.




## License
This project is licensed under the MIT License.

## Acknowledgments
Thanks to OpenWeather for providing weather data.
