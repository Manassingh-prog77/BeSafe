
# BeSafe

**BeSafe** is a women protection app designed to empower women by providing safety, support, and resources during distressing situations. With a focus on real-time assistance and community, BeSafe offers a suite of features aimed at ensuring personal safety and enhancing self-defense awareness.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Challenges Faced](#challenges-faced)
- [License](#license)

## Features

- **SOS Alerts**: Quickly send distress signals to emergency contacts with your location.
- **Location Sharing**: Share your real-time location with trusted contacts for added safety.
- **Nearest Safe Location Finder**: Utilize integrated mapping features to locate the nearest safe places.
- **Community Rooms**: Join community discussions and support groups for shared safety tips and experiences.
- **Fake Call Interface**: Simulate an incoming call to extricate yourself from uncomfortable situations.
- **AI Chatbot**: Access an intelligent chatbot for real-time assistance, answering safety-related questions and providing guidance during emergencies.
- **Safety Tutorials**: Learn personal safety techniques and self-defense skills through quick access tutorials.
- **Quick Safety Tips**: Receive practical and actionable safety tips tailored to different situations, helping users stay prepared.
- **Emergency Situation Soundboard**: Use saved voice recordings, such as police sirens, to deter potential threats and signal for help.

## Technologies Used

- **Frontend**: React Native, Expo
- **Backend**: Node.js, Express (if applicable)
- **Database**: MongoDB (if applicable)
- **APIs**: Google Maps API (for location services), RapidAPI (for chatbot functionality), any other relevant APIs
- **Styling**: NativeWind CSS or other CSS-in-JS libraries

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Manassingh-prog77/BeSafe.git
   cd BeSafe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   expo start
   ```
   Scan the QR code with the Expo Go app to view the app on your device.

## Usage

- Open the app and register or log in.
- Use the map feature to find nearby safe locations.
- Set up SOS alerts and emergency contacts.
- Access community rooms and engage in discussions.
- Utilize the AI chatbot for instant guidance.
- Follow safety tutorials and tips to enhance your self-defense skills.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repo and submit a pull request.

## Challenges Faced

While building BeSafe, I encountered challenges related to:
- Implementing the search functionality for nearby safe locations, which required multiple API calls and processing large datasets.
- Optimizing the logic for finding the shortest distance to a safe location, which involved refining algorithms to improve performance and user experience.
