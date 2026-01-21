# 🎬 CastUp - Full-Stack Cinema Networking Platform

**AI-Powered platform connecting film industry professionals**

Complete full-stack application with React frontend and Node.js backend.

---

## 📁 Project Structure

```
SREEPRO/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/           # Node.js + Express API
│   ├── src/
│   ├── package.json
│   └── .env
│
└── README.md         # This file
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up database (see backend/QUICK_START.md)
# Update .env with your DATABASE_URL

# Start backend server
npm run dev
```

Backend runs on: **http://localhost:5000**

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

Frontend runs on: **http://localhost:3000**

---

## ✨ Features

### Frontend (React + Vite + Tailwind)
- ✅ Modern UI with glassmorphism effects
- ✅ Dark theme with premium aesthetics
- ✅ Multi-source file upload (Computer, YouTube, Instagram)
- ✅ Social authentication (Google, Facebook) UI
- ✅ Portfolio creation & management
- ✅ User discovery & search
- ✅ Casting calls
- ✅ Script locker with file sharing
- ✅ Notifications system
- ✅ Responsive design

### Backend (Node.js + Express + PostgreSQL)
- ✅ JWT authentication
- ✅ RESTful APIs
- ✅ PostgreSQL database
- ✅ File upload to Cloudinary
- ✅ Multi-source file handling
- ✅ Portfolio management
- ✅ User profiles
- ✅ Casting call system
- ✅ File sharing

---

## 📚 Documentation

- **Frontend**: See `frontend/README.md` (to be created)
- **Backend**: See `backend/README.md` ✅
- **Backend Quick Start**: See `backend/QUICK_START.md` ✅
- **API Docs**: See `backend/README.md` for all endpoints ✅

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- React Context API
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- PostgreSQL (via Neon)
- JWT for auth
- Cloudinary for file storage
- Bcrypt for password hashing
- Multer for file uploads

---

## 🔧 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
CLIENT_URL=http://localhost:3000
PORT=5000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📖 Development Workflow

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health: http://localhost:5000/api/health

---

## 🚢 Deployment

### Backend
- **Platform**: Render.com or Railway.app
- **Database**: Neon (PostgreSQL)
- **Build**: `npm install`
- **Start**: `npm start`

### Frontend
- **Platform**: Vercel or Netlify
- **Build**: `npm run build`
- **Output**: `dist/`

---

## 📝 Next Steps

1. ✅ Backend complete
2. ✅ Frontend UI complete
3. ⏳ Set up PostgreSQL database (Neon)
4. ⏳ Connect frontend to backend APIs
5. ⏳ Add OAuth credentials (Google/Facebook)
6. ⏳ Deploy to production

---

## 🤝 Contributing

This is a full-stack portfolio project showcasing modern web development practices.

---

## 📄 License

ISC

---

Built with ❤️ using React, Node.js, and PostgreSQL
