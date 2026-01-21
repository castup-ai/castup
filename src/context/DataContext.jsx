import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

export function useData() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error('useData must be used within DataProvider')
    }
    return context
}

export function DataProvider({ children }) {
    const [profiles, setProfiles] = useState([])
    const [castingCalls, setCastingCalls] = useState([])
    const [notifications, setNotifications] = useState([])
    const [files, setFiles] = useState([])

    // Load data from localStorage on mount
    useEffect(() => {
        const savedProfiles = localStorage.getItem('castup_profiles')
        const savedCastingCalls = localStorage.getItem('castup_casting_calls')
        const savedNotifications = localStorage.getItem('castup_notifications')
        const savedFiles = localStorage.getItem('castup_files')

        if (savedProfiles) setProfiles(JSON.parse(savedProfiles))
        if (savedCastingCalls) setCastingCalls(JSON.parse(savedCastingCalls))
        if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
        if (savedFiles) setFiles(JSON.parse(savedFiles))
    }, [])

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('castup_profiles', JSON.stringify(profiles))
    }, [profiles])

    useEffect(() => {
        localStorage.setItem('castup_casting_calls', JSON.stringify(castingCalls))
    }, [castingCalls])

    useEffect(() => {
        localStorage.setItem('castup_notifications', JSON.stringify(notifications))
    }, [notifications])

    useEffect(() => {
        localStorage.setItem('castup_files', JSON.stringify(files))
    }, [files])

    // Profile methods
    const createProfile = (profileData) => {
        const newProfile = {
            id: Date.now(),
            ...profileData,
            createdAt: new Date().toISOString(),
            views: 0,
            rating: 0,
        }
        setProfiles([...profiles, newProfile])
        return newProfile
    }

    const updateProfile = (profileId, updates) => {
        setProfiles(profiles.map(p =>
            p.id === profileId ? { ...p, ...updates } : p
        ))
    }

    const getProfileById = (profileId) => {
        return profiles.find(p => p.id === parseInt(profileId))
    }

    // Casting Call methods
    const createCastingCall = (castingData) => {
        const newCasting = {
            id: Date.now(),
            ...castingData,
            createdAt: new Date().toISOString(),
            applications: [],
            status: 'Open',
        }
        setCastingCalls([...castingCalls, newCasting])
        return newCasting
    }

    const updateCastingCall = (castingId, updates) => {
        setCastingCalls(castingCalls.map(c =>
            c.id === castingId ? { ...c, ...updates } : c
        ))
    }

    const applyCastingCall = (castingId, userId, message) => {
        const application = {
            userId,
            castingId,
            message,
            appliedAt: new Date().toISOString(),
            status: 'Pending',
        }

        updateCastingCall(castingId, {
            applications: [...castingCalls.find(c => c.id === castingId)?.applications || [], application]
        })

        addNotification({
            type: 'application',
            message: 'You applied for a casting call',
            castingId,
        })
    }

    // Notification methods
    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            ...notification,
            createdAt: new Date().toISOString(),
            read: false,
        }
        setNotifications([newNotification, ...notifications])
    }

    const markNotificationRead = (notificationId) => {
        setNotifications(notifications.map(n =>
            n.id === notificationId ? { ...n, read: true } : n
        ))
    }

    const clearAllNotifications = () => {
        setNotifications([])
    }

    // File methods
    const uploadFile = (fileData) => {
        const newFile = {
            id: Date.now(),
            ...fileData,
            uploadedAt: new Date().toISOString(),
            sharedWith: [],
        }
        setFiles([...files, newFile])
        return newFile
    }

    const shareFile = (fileId, userId) => {
        setFiles(files.map(f => {
            if (f.id === fileId) {
                return {
                    ...f,
                    sharedWith: [...f.sharedWith, {
                        userId,
                        sharedAt: new Date().toISOString(),
                        accessToken: 'token_' + Date.now(),
                    }]
                }
            }
            return f
        }))
    }

    const value = {
        profiles,
        castingCalls,
        notifications,
        files,
        createProfile,
        updateProfile,
        getProfileById,
        createCastingCall,
        updateCastingCall,
        applyCastingCall,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        uploadFile,
        shareFile,
        unreadCount: notifications.filter(n => !n.read).length,
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
