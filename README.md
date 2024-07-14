# QR Code Scanner with React Native

This is a simple QR code scanner application built using React Native and Expo. The application requests camera permissions, scans QR codes, and opens the scanned URL in the default web browser.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruv8433/Prasunet_AD_05.git
   cd Prasunet_AD_05
   ```
   
2. Install dependencies:
   Make sure you have npm or yarn installed. Then run: 
   ```bash
   npm install
   # or  
   yarn install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   #or
   yarn start
   ```

4. Usage

Run the application:

- For iOS, press i to run on an iOS simulator (macOS only).
- For Android, press a to run on an Android emulator.
- Alternatively, you can scan the QR code provided by Expo using the Expo Go app on your physical device.
  
- Grant camera permissions:
  The app will request camera permissions on startup. Ensure you grant the permissions for the app to function properly.

- Scan a QR code:
  Point the camera towards a QR code to scan it. The app will automatically detect and read the QR code, and then open the URL in the default web browser.

## Features

- Camera Permission Handling: The app requests and handles camera permissions.
- QR Code Scanning: Uses expo-barcode-scanner to scan QR codes.
- Automatic URL Redirection: Automatically opens the scanned URL in the default web browser.

## Screenshorts

![WhatsApp Image 2024-07-14 at 10 11 24 AM](https://github.com/user-attachments/assets/45932d74-1637-414f-81e0-67e29faf4cfe)


