# weather-forecast-page
A responsive and dynamic Weather Forecast Web Application built using HTML, Tailwind CSS, and JavaScript, integrated with the OpenWeatherMap API.
The application displays real-time weather data along with a 5-day forecast and includes smooth animations, dynamic background changes, and a clean modern UI.
---
Live Demo
https://rajeswari-weather-forecast-page.netlify.app/
---
Features
Current Weather

- City Name
- Temperature (°C)
- Weather Condition
- Humidity
- Wind Speed
- Dynamic Weather Icon

 5-Day Forecast

- Day-wise forecast
- Min & Max Temperature
- Weather Condition Summary
- Animated forecast cards

UI Enhancements

- Dynamic gradient background based on weather condition
- Smooth fade and slide animations
- Staggered card animations
- Hover effects
- Loading spinner
- Error handling for invalid cities
- Responsive design (Mobile, Tablet, Desktop)

Interactive Features

- City search functionality
- Reset button (loads default city)
- Enter key support
- Real-time data from OpenWeatherMap API
---
Tech Stack
- HTML5
- Tailwind CSS (CDN)
- JavaScript (ES6)
- OpenWeatherMap API
- Netlify (Deployment)
---
How It Works

1. User enters a city name.
2. App fetches:
   - Current weather data
   - 5-day forecast data
3. UI updates dynamically.
4. Background changes based on weather type.
5. Forecast cards animate into view.
---
Project Structure
weather-forecast-app/
│
├── index.html
├── script.js
---

API Integration

This project uses the OpenWeatherMap API to fetch real-time weather data.
To use your own API key:
1. Create an account at OpenWeatherMap.
2. Generate an API key.
3. Replace the key inside:
const API_KEY = "your_api_key_here";
---
Responsive Design
The layout is fully responsive and works across:

- Desktop
- Tablet
- Mobile devices
---

Future Improvements
- °C / °F Toggle
- Auto location detection (Geolocation API)
- Dark/Light mode toggle
- Weather-based background images
- Hourly forecast view
---
Author
Rajeswari Behera
---
License
This project is for educational and portfolio purposes.

---

⭐ If you like this project, consider giving it a star.
