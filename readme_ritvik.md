<<<<<<< HEAD
# BES-DSP Expo App

## Overview

BES-DSP is a React Native mobile application built with Expo, designed to manage agricultural drone pilots and related services. The app provides user authentication, pilot management, and integrates with a backend powered by Firebase Firestore for data storage and Firebase Authentication for user login.

## Features

### Frontend

- **User Authentication:** Email/password login and phone number login using Firebase Authentication.
- **Pilot Management:** View a list of drone pilots, add new pilots with detailed personal, contact, and location information.
- **Pilot Status:** Toggle pilot active/inactive status.
- **Multi-step Forms:** Add pilots using a multi-step form with validation.
- **Navigation:** Uses Expo Router for file-based routing and navigation.

### Backend

- **Express Server:** Node.js Express backend serving RESTful API endpoints.
- **Firebase Admin SDK:** Backend uses Firebase Admin SDK to interact with Firestore.
- **User API:** Provides CRUD operations on users (pilots) via `/users` endpoint.
  - `GET /users` - List all users
  - `GET /users/:id` - Get user by ID
  - `POST /users` - Create new user
  - `PUT /users/:id` - Update user by ID
  - `DELETE /users/:id` - Delete user by ID

## Project Structure

- `app/` - React Native frontend screens and components.
- `backend/` - Express backend server and API routes.
- `android/` - Android native project files for Expo.
- `firebaseConfig.ts` - Firebase client SDK configuration.
- `database_schema` - Database schema documentation.
- `sample_firestore_data.json` - Sample Firestore data for testing.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Firebase project with Firestore and Authentication enabled.
- Service account JSON file for Firebase Admin SDK (`backend/serviceAccountKey.json`).

### Frontend Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npx expo start
   ```

3. Run the app on an emulator or physical device using Expo Go or development builds.

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Place your Firebase service account JSON file as `serviceAccountKey.json` in the `backend` directory.

4. Start the backend server:

   ```bash
   node index.js
   ```

5. The backend server will run on port 3000 by default.

## How It Works

- The frontend app authenticates users via Firebase Authentication.
- The pilots screen fetches pilot data from the backend API (`/users`).
- New pilots can be added via a multi-step form, which sends data to the backend to create new user records in Firestore.
- Pilot status can be toggled, updating the backend accordingly.
- The backend uses Firebase Admin SDK to securely manage Firestore data.

## Additional Notes

- Ensure your Firebase project is properly configured with Firestore and Authentication.
- Keep your Firebase service account JSON file secure and do not commit it to public repositories.
- The app uses Expo Router for navigation and supports both Android and iOS platforms.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/)

---

This README provides a comprehensive overview of the BES-DSP Expo app, backend services, and setup instructions to help you understand and work with the project effectively.
=======
# BES-DSP Expo App

## Overview

BES-DSP is a React Native mobile application built with Expo, designed to manage agricultural drone pilots and related services. The app provides user authentication, pilot management, and integrates with a backend powered by Firebase Firestore for data storage and Firebase Authentication for user login.

## Features

### Frontend

- **User Authentication:** Email/password login and phone number login using Firebase Authentication.
- **Pilot Management:** View a list of drone pilots, add new pilots with detailed personal, contact, and location information.
- **Pilot Status:** Toggle pilot active/inactive status.
- **Multi-step Forms:** Add pilots using a multi-step form with validation.
- **Navigation:** Uses Expo Router for file-based routing and navigation.

### Backend

- **Express Server:** Node.js Express backend serving RESTful API endpoints.
- **Firebase Admin SDK:** Backend uses Firebase Admin SDK to interact with Firestore.
- **User API:** Provides CRUD operations on users (pilots) via `/users` endpoint.
  - `GET /users` - List all users
  - `GET /users/:id` - Get user by ID
  - `POST /users` - Create new user
  - `PUT /users/:id` - Update user by ID
  - `DELETE /users/:id` - Delete user by ID

## Project Structure

- `app/` - React Native frontend screens and components.
- `backend/` - Express backend server and API routes.
- `android/` - Android native project files for Expo.
- `firebaseConfig.ts` - Firebase client SDK configuration.
- `database_schema` - Database schema documentation.
- `sample_firestore_data.json` - Sample Firestore data for testing.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- Expo CLI installed globally (`npm install -g expo-cli`).
- Firebase project with Firestore and Authentication enabled.
- Service account JSON file for Firebase Admin SDK (`backend/serviceAccountKey.json`).

### Frontend Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npx expo start
   ```

3. Run the app on an emulator or physical device using Expo Go or development builds.

### Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Place your Firebase service account JSON file as `serviceAccountKey.json` in the `backend` directory.

4. Start the backend server:

   ```bash
   node index.js
   ```

5. The backend server will run on port 3000 by default.

## How It Works

- The frontend app authenticates users via Firebase Authentication.
- The pilots screen fetches pilot data from the backend API (`/users`).
- New pilots can be added via a multi-step form, which sends data to the backend to create new user records in Firestore.
- Pilot status can be toggled, updating the backend accordingly.
- The backend uses Firebase Admin SDK to securely manage Firestore data.

## Additional Notes

- Ensure your Firebase project is properly configured with Firestore and Authentication.
- Keep your Firebase service account JSON file secure and do not commit it to public repositories.
- The app uses Expo Router for navigation and supports both Android and iOS platforms.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Documentation](https://reactnative.dev/)

---

This README provides a comprehensive overview of the BES-DSP Expo app, backend services, and setup instructions to help you understand and work with the project effectively.
>>>>>>> 40c360e (Update phone login tests and Jest configuration setup)
