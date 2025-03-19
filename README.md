# Cainan Drive

Cainan Drive is a modern file management and cloud storage application built with React, TypeScript, and other cutting-edge technologies. It allows users to upload, organize, and manage files and folders seamlessly. It was made as a simple side project of multiple services integration with React and Next.js

## 🚀 Features

- **File Uploads**: Upload files with size and type restrictions.
- **Folder Management**: Create, rename, and delete folders.
- **User Authentication**: Secure login and logout functionality.
- **Breadcrumb Navigation**: Easily navigate through folder hierarchies.
- **Responsive Design**: Fully optimized for desktop devices.

## 🛠️ Tech Stack

- **Frontend**: Next.js. React, TypeScript, Tailwind CSS
- **Backend**: Drizzle ORM, SQLite
- **State Management**: Recoil
- **File Uploads**: UploadThing
- **Authentication**: Clerk
- **Notifications**: React Toastify

## 📂 Folder Structure
```
cainan-drive/
├── src/
│   ├── app/                # API routes and server-side logic
│   ├── components/         # React components
│   │   ├── drive/          # Drive-related components (e.g., file rows, dialogs)
│   ├── lib/                # Utility functions and shared logic
│   ├── server/             # Backend logic (e.g., database queries, mutations)
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   └── index.tsx           # Entry point for the application
├── public/                 # Static assets
├── .env                    # Environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```


## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cainant/cainan-drive.git
   cd cainan-drive
2. Install dependencies:
    ```bash
    npm install
3. Set up environment variables:
    - Create a .env file in the root directory.
    - Add the required environment variables (e.g., database connection, API keys).
4. Run devolopment server:
    ```bash
    npm run dev
   