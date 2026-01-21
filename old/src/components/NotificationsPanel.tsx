import { Bell, X, Sparkles, MessageSquare, Users, Film, FileText, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface NotificationsPanelProps {
  onClose: () => void;
  onClearUnread: () => void;
}

export default function NotificationsPanel({ onClose, onClearUnread }: NotificationsPanelProps) {
  const notifications = [
    {
      id: '1',
      type: 'casting',
      icon: Sparkles,
      iconColor: '#FFC107',
      title: 'New casting match!',
      message: 'You have a 95% match for "Lead Actor - Drama"',
      time: '5 min ago',
      unread: true,
    },
    {
      id: '2',
      type: 'message',
      icon: MessageSquare,
      iconColor: '#FF7A5A',
      title: 'New message from Emma Richardson',
      message: 'Hi! I\'d love to discuss the project with you...',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: '3',
      type: 'connection',
      icon: Users,
      iconColor: '#28A745',
      title: 'Marcus Chen viewed your profile',
      message: 'A cinematographer is interested in your work',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: '4',
      type: 'film',
      icon: Film,
      iconColor: '#FF7A5A',
      title: 'Your film reached 10K views!',
      message: '"The Last Summer" is trending in Drama category',
      time: '3 hours ago',
      unread: false,
    },
    {
      id: '5',
      type: 'script',
      icon: FileText,
      iconColor: '#6B6B6B',
      title: 'Script shared with you',
      message: 'Sarah Mitchell shared "Midnight Dreams - Final.pdf"',
      time: '1 day ago',
      unread: false,
    },
    {
      id: '6',
      type: 'verify',
      icon: CheckCircle,
      iconColor: '#28A745',
      title: 'Credentials verified!',
      message: 'Your acting certification has been verified',
      time: '2 days ago',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2rem)]">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-[#FF7A5A]" />
              <h2 className="text-2xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
                Notifications
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#FFF8F0] transition-colors"
            >
              <X className="w-5 h-5 text-[#6B6B6B]" />
            </button>
          </div>
          <Button
            onClick={onClearUnread}
            variant="ghost"
            className="text-[#FF7A5A] hover:bg-[#FF7A5A]/10"
          >
            Mark all as read
          </Button>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl transition-all cursor-pointer ${
                    notification.unread
                      ? 'bg-[#FF7A5A]/5 border-l-4 border-[#FF7A5A]'
                      : 'bg-[#FFF8F0] hover:bg-[#FFE5DD]'
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${notification.iconColor}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: notification.iconColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3
                          className="text-[#3C3C3C]"
                          style={{ fontWeight: notification.unread ? 600 : 500 }}
                        >
                          {notification.title}
                        </h3>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#FF7A5A] rounded-full ml-2 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-[#6B6B6B] mb-2">{notification.message}</p>
                      <span className="text-xs text-[#6B6B6B]">{notification.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-[rgba(0,0,0,0.08)]">
          <Button
            variant="ghost"
            className="w-full text-[#FF7A5A] hover:bg-[#FF7A5A]/10"
          >
            View All Notifications
          </Button>
        </div>
      </div>
    </div>
  );
}
