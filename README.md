# Embody

## Overview

Embody is a revolutionary web application designed to track recovery progress from physical injuries while considering mental health and overall lifestyle. Unlike traditional recovery tracking tools that focus solely on physical rehabilitation, Embody integrates multiple facets of well-being—physical health, mental health, exercise, and sleep quality—to provide a holistic view of recovery.

At its core, Embody leverages machine learning models to analyze user data, offering insightful visualizations and personalized recovery progress reports. By combining real-time tracking with intelligent analysis, Embody ensures users receive data-driven guidance on their journey to full recovery.

## Tech Stack & Tools Used

Embody is built using the latest technologies to ensure high performance, scalability, and an intuitive user experience:

### Frontend:

- **Vite** – Fast build tool for modern web applications
- **TypeScript** – Enhancing reliability and maintainability
- **React** – Dynamic and responsive UI development
- **Tailwind CSS** – Utility-first styling for efficient design

### Backend & Database:

- **Supabase** – Secure user authentication and data storage
- **Node.js & Express.js** (Planned for backend logic and API handling)

### Machine Learning:

- Custom-trained **ML models** powering each tracker
- Another additional model aggregating all tracker results for a final recovery progress report
- **Currently, 3 models are operational, with the remaining 2 in development and to be integrated soon.**

## Features

- **Holistic Recovery Tracking**: Tracks not only physical health but also mental well-being, exercise habits, and sleep quality.
- **AI-Powered Insights**: Each tracker is backed by an ML model to provide accurate, data-driven analysis.
- **Comprehensive Recovery Report**: A unique 5th model aggregates all individual tracker results for a final, holistic progress report.
- **Data Visualization**: Intuitive, easy-to-read graphs help users monitor trends and make informed decisions.
- **Secure User Authentication**: Every user has a personal account with securely stored data using Supabase.
- **Data Privacy & Security**: User data is encrypted and securely stored, ensuring compliance with best security practices.
- **Dyslexic-Friendly Text**: Users have the option to enable dyslexic-friendly fonts for improved readability.
- **Night Mode**: A dark theme option is available for better accessibility and user comfort.

## Technical Workflow

1. **User Authentication**

   - Users log in using their credentials via Supabase authentication.
   - Secure data storage ensures privacy and accessibility.

2. **Data Entry & Tracking**

   - Users input relevant data into four trackers: Physical Health, Mental Health, Exercise, and Sleep Quality.
   - Each tracker processes the input through a dedicated ML model.

3. **Machine Learning Processing**

   - Each tracker’s ML model analyzes and returns personalized insights.
   - The 5th ML model compiles data from all trackers to generate a final recovery report.

4. **Data Visualization**

   - All results are displayed via interactive and easy-to-read graphs.
   - Users can track progress over time, identifying patterns and improvements.

5. **Final Report Generation**

   - The system provides a comprehensive summary of the user’s recovery journey.
   - Insights help users adjust their routines for optimal rehabilitation.

## Why Embody is Unique

- **Truly Holistic Approach**: Unlike other apps that focus only on physical recovery, Embody integrates multiple well-being factors, making it a **first-of-its-kind solution**.
- **ML-Driven Personalization**: The use of multiple trained models ensures that every user gets **tailored insights based on their unique recovery journey**.
- **Seamless Visualization**: **Interactive and easy-to-read graphs** make data interpretation effortless, helping users stay motivated.
- **Secure & Private**: With **Supabase-powered authentication**, user data remains safe and confidential.
- **Data Protection Measures**: **Encryption and strict access controls** are in place to safeguard user information, ensuring privacy and security.
- **Accessibility-Focused**: Features like **dyslexic-friendly text and night mode** enhance usability for a wider audience.

---

Embody redefines recovery tracking by offering a **comprehensive, intelligent, and user-friendly** solution. Whether you're recovering from an injury or striving for a balanced lifestyle, Embody provides the insights you need to optimize your health journey.

🚀 **Stay on track, stay motivated, and recover smarter with Embody!**

### Access the Application

For judging and review, access the deployed application here: [https://embody-blond.vercel.](https://embody-blond.vercel.app/)[app/](https://embody-blond.vercel.app/)

### Work in Progress

Embody is an evolving project. **Currently, 3 models are operational, and we will be integrating the remaining 2 as they are developed.**

