# PowerGYM - Digital Management System

A comprehensive digital solution for managing gym members, billing, inventory, and user engagement.

## 🚀 Features

### 🛡️ Admin Panel
*   **Complete Dashboard**: Real-time overview of active members, revenue, and pending tasks.
*   **Quick Actions**: fast access to common tasks like adding members or creating bills.
*   **Member Management**: Add, update, and delete member profiles.
*   **Billing System**: Create digital receipts, track payments (Paid/Pending/Overdue).
*   **Reports & Exports**: **[NEW]** Export full Member and Transaction history to CSV.
*   **Inventory**: Manage Supplements and Diet plans.
*   **Notifications**: Send announcements to members.

### 👤 Member Portal
*   **Dashboard**: Personalized view with current package status and bills.
*   **Self-Service**: View receipts and past payment history.
*   **Signup**: **[NEW]** Self-registration flow with automatic profile creation.
*   **Notifications**: Receive fee reminders and gym announcements.

### 👥 User/Guest View **[NEW]**
*   **Explore**: Browse gym packages, supplements, and trainers without login (or with a basic user account).
*   **Search**: **[NEW]** Functional search bar to find packages and supplements.
*   **Visual Store**: **[NEW]** View product images for supplements and gear.
*   **Signup**: dedicated signup flow for new users.

## 🛠️ Tech Stack
*   **Frontend**: React (Vite) + TypeScript
*   **Styling**: Tailwind CSS + Shadcn UI (Premium Dark/Light Mode Design)
*   **Backend**: Firebase (Authentication, Firestore)
*   **State Management**: React Query + Context API
*   **Icons**: Lucide React

## 📦 Project Structure
*   `/src/pages/admin`: Admin workflows (Dashboard, Members, Bills, Reports).
*   `/src/pages/member`: Member workflows (Dashboard, Bills, Signup).
*   `/src/pages/user`: Public/Guest workflows (Dashboard, Search, Signup).
*   `/src/components/gym`: Core business components (Tables, Dialogs, Cards).
*   `/src/lib`: Configuration (Firebase, Mock Data).
*   `/src/contexts`: Global state (Auth).

## 🚀 Setup Instructions

1.  **Clone/Download**:
    Ensure you have the project files.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Firebase Configuration**:
    *   Update `src/lib/firebase.ts` with your Firebase project keys.
    *   Enable **Authentication** (Email/Password).
    *   Enable **Firestore Database**.

4.  **Run Locally**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:8080`.

## 🔒 Roles & Access
*   **Admin**: `admin@gym.com` or `admin@gmail.com` (Full Access)
*   **Member**: Authenticated users with a valid membership plan.
*   **User**: Registered guests exploring the gym.

## 📄 License
Private Property of PowerGYM.
