# Real-Time Chat Application

## Overview
This is a real-time chat application designed to provide seamless and instant communication between users. The app is built using modern technologies for both frontend and backend, ensuring a smooth and efficient user experience. The application also incorporates authentication and secure communication using JWT tokens and WebSocket technology for real-time updates.

---

## Features
- **Real-Time Messaging**: Instant messaging powered by WebSocket for real-time updates.
- **Secure Authentication**: User authentication implemented using JWT tokens.
- **Modern UI**: A responsive and interactive user interface built using React and ShadCN UI.
- **Scalable Backend**: Node.js server to handle API requests and WebSocket connections efficiently.
- **MongoDB Database**: Robust data storage for users, messages, and chat history.

---

## Tech Stack
### Frontend
- **React.js**
- **ShadCN UI** (for styling and UI components)

### Backend
- **Node.js**
- **WebSocket** (for real-time communication)
- **JWT** (for secure user authentication)

### Database
- **MongoDB**

---

## Installation and Setup
### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud instance)

### Steps
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   ```bash
   # For the frontend
   cd frontend
   npm install

   # For the backend
   cd ../backend
   npm install
   ```

3. **Setup Environment Variables**
   Create `.env` files in both `frontend` and `backend` folders with the following configurations:

   #### Backend
   ```env
   PORT=8747
   JWT_SECRET=<your-jwt-secret>
   DATABASE_URL=mongodb://localhost:27017/chat-app
   ORIGIN=http://localhost:5173
   ```

   #### Frontend
   ```env
   REACT_APP_API_URL=http://localhost:8747
   ```

4. **Run the Application**
   ```bash
   # Start the backend server
   cd backend
   npm start

   # Start the frontend server
   cd ../frontend
   npm start
   ```

5. **Access the Application**
   Open your browser and navigate to: `http://localhost:5173`

---

## Folder Structure
```
project-root/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── server.js
├── frontend/
│   ├── src/
│   └── public/
├── README.md
└── .env
```

---

## Future Enhancements
- **Group Chats**: Support for creating and managing group conversations.
- **Media Sharing**: Enable users to share images, videos, and documents.
- **Push Notifications**: Real-time notifications for new messages.
- **Read Receipts**: Indicate when messages are read by recipients.

---

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

