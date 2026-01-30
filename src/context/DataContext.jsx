import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { portfolioAPI, castingAPI, fileAPI, userAPI } from '../services/api';

const DataContext = createContext();

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
}

export function DataProvider({ children }) {
    const { user } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [castingCalls, setCastingCalls] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load data from backend API on mount
    useEffect(() => {
        if (user) {
            loadAllData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const loadAllData = async () => {
        try {
            setLoading(true);

            // Load all data in parallel
            const [profilesRes, castingRes, filesRes] = await Promise.all([
                userAPI.getUsers().catch(() => ({ data: { users: [] } })),
                castingAPI.getAll().catch(() => ({ data: { castingCalls: [] } })),
                fileAPI.getMyFiles().catch(() => ({ data: { files: [] } }))
            ]);

            setProfiles(profilesRes.data.users || []);
            setCastingCalls(castingRes.data.castingCalls || []);
            setFiles(filesRes.data.files || []);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Profile methods
    const createProfile = async (profileData) => {
        try {
            const response = await portfolioAPI.createOrUpdate(profileData);
            const newProfile = response.data.portfolio;

            // Update local state
            setProfiles(prev => {
                const existing = prev.find(p => p.id === newProfile.id);
                if (existing) {
                    return prev.map(p => p.id === newProfile.id ? newProfile : p);
                }
                return [...prev, newProfile];
            });

            return newProfile;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    };

    const updateProfile = async (profileId, updates) => {
        try {
            const response = await portfolioAPI.createOrUpdate({ ...updates, id: profileId });
            const updatedProfile = response.data.portfolio;

            setProfiles(prev => prev.map(p =>
                p.id === profileId ? updatedProfile : p
            ));

            return updatedProfile;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    const getProfileById = async (profileId) => {
        try {
            // First check local state
            const localProfile = profiles.find(p => p.id == profileId || p.id === parseInt(profileId));
            if (localProfile) return localProfile;

            // If not in local state, fetch from API
            const response = await portfolioAPI.getPortfolio(profileId);
            return response.data.portfolio;
        } catch (error) {
            console.error('Error getting profile:', error);
            return null;
        }
    };

    // Casting Call methods
    const createCastingCall = async (castingData) => {
        try {
            const response = await castingAPI.create(castingData);
            const newCasting = response.data.castingCall;

            setCastingCalls(prev => [newCasting, ...prev]);
            return newCasting;
        } catch (error) {
            console.error('Error creating casting call:', error);
            throw error;
        }
    };

    const addCastingCall = createCastingCall; // Alias

    const updateCastingCall = async (castingId, updates) => {
        try {
            setCastingCalls(prev => prev.map(c =>
                c.id === castingId ? { ...c, ...updates } : c
            ));
        } catch (error) {
            console.error('Error updating casting call:', error);
            throw error;
        }
    };

    const applyCastingCall = async (castingId, userId, message) => {
        try {
            await castingAPI.apply(castingId, message);

            // Reload casting calls to get updated data
            const response = await castingAPI.getAll();
            setCastingCalls(response.data.castingCalls || []);

            addNotification({
                type: 'application',
                message: 'You applied for a casting call',
                castingId,
            });
        } catch (error) {
            console.error('Error applying to casting call:', error);
            throw error;
        }
    };

    // Notification methods (keep local for now)
    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            ...notification,
            createdAt: new Date().toISOString(),
            read: false,
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markNotificationRead = (notificationId) => {
        setNotifications(prev => prev.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        ));
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // File methods
    const uploadFile = async (fileData) => {
        try {
            let response;

            if (fileData instanceof FormData) {
                // File upload from computer
                response = await fileAPI.uploadFile(fileData);
            } else if (fileData.url) {
                // URL upload (YouTube, Instagram, etc.)
                response = await fileAPI.uploadFromUrl(fileData);
            }

            const newFile = response.data.file;
            setFiles(prev => [newFile, ...prev]);
            return newFile;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    };

    const addFile = uploadFile; // Alias

    const shareFile = async (fileId, userId) => {
        try {
            await fileAPI.shareFile(fileId, [userId]);

            // Reload files to get updated data
            const response = await fileAPI.getMyFiles();
            setFiles(response.data.files || []);
        } catch (error) {
            console.error('Error sharing file:', error);
            throw error;
        }
    };

    const value = {
        profiles,
        castingCalls,
        notifications,
        files,
        loading,
        createProfile,
        updateProfile,
        getProfileById,
        createCastingCall,
        addCastingCall,
        updateCastingCall,
        applyCastingCall,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        uploadFile,
        addFile,
        shareFile,
        refreshData: loadAllData,
        unreadCount: notifications.filter(n => !n.read).length,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
