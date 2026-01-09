# ToDo Application

A full-stack Todo application built with React, Express, and Supabase, optimized for Android deployment via Capacitor.

## Features

*   **Authentication**: Secure sign-up and sign-in using Supabase Auth (JWT).
*   **Task Management**: Create, read, update, and delete tasks.
*   **Real-time Storage**: Data is synced with Supabase PostgreSQL database.
*   **Android APK**: Standalone Android application support using Capacitor.
*   **Secure API**: Express backend with middleware for token verification.

## Tech Stack

*   **Frontend**: React, Vite, TypeScript, Tailwind CSS, ShadCN UI.
*   **Backend**: Node.js, Express.js.
*   **Database & Auth**: Supabase.
*   **Mobile**: Capacitor (Android).

## Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd ToDo
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the root directory with the following keys:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    DATABASE_URL=your_database_connection_string
    SESSION_SECRET=your_session_secret
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## Building for Android

1.  **Build Web Assets**
    ```bash
    npm run build
    ```

2.  **Sync Capacitor**
    ```bash
    npx cap sync
    ```

3.  **Open in Android Studio**
    ```bash
    npx cap open android
    ```
    From Android Studio, you can build the APK using **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## Project Structure

*   `/client` - React frontend code.
*   `/server` - Express backend code.
*   `/shared` - Shared types and schema (Drizzle/Zod).
*   `/android` - Native Android project files.
