import { useData } from '../../context/DataContext'

export default function NotificationsPage() {
    const { notifications, markNotificationRead, clearAllNotifications } = useData()

    const handleMarkRead = (id) => {
        markNotificationRead(id)
    }

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'match': return '🎯'
            case 'application': return '📝'
            case 'view': return '👁️'
            case 'message': return '💬'
            case 'casting': return '🎬'
            default: return '🔔'
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-display font-bold mb-2">
                            <span className="text-gradient">Notifications</span>
                        </h1>
                        <p className="text-gray-400">Stay updated with your latest activities</p>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={clearAllNotifications}
                            className="btn-ghost text-sm"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Notifications List */}
                {notifications.length > 0 ? (
                    <div className="space-y-3">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`glass-card p-6 transition-all duration-300 ${notification.read ? 'opacity-60' : 'border-l-4 border-gold-500'
                                    }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="text-3xl mt-1">{getNotificationIcon(notification.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-200">{notification.message}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(notification.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {!notification.read && (
                                            <button
                                                onClick={() => handleMarkRead(notification.id)}
                                                className="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
                                            >
                                                Mark Read
                                            </button>
                                        )}
                                        {!notification.read && (
                                            <div className="w-3 h-3 bg-gold-500 rounded-full animate-pulse" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card p-12 text-center">
                        <div className="text-6xl mb-4">🔕</div>
                        <h3 className="text-xl font-bold mb-2">All Caught Up!</h3>
                        <p className="text-gray-400">You have no new notifications</p>
                    </div>
                )}
            </div>
        </div>
    )
}
