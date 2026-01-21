import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from './config/passport.js';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/files.js';
import portfolioRoutes from './routes/portfolios.js';
import userRoutes from './routes/users.js';
import castingRoutes from './routes/casting.js';
import initializeDatabase from './config/init-db.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/users', userRoutes);
app.use('/api/casting', castingRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'CastUp API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize database and start server
const startServer = async () => {
    try {
        // Initialize database tables
        await initializeDatabase();

        // Start server
        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════╗
║   🎬 CastUp Backend Server Running   ║
║   Port: ${PORT}                       ║
║   Environment: ${process.env.NODE_ENV || 'development'}        ║
╚═══════════════════════════════════════╝
            `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
