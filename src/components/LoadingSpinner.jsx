export default function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
    const sizes = {
        small: 'w-8 h-8',
        medium: 'w-16 h-16',
        large: 'w-24 h-24',
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative">
                <div className={`${sizes[size]} border-4 border-gold-500/20 border-t-gold-500 rounded-full animate-spin`} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl animate-pulse">🎬</span>
                </div>
            </div>
            {message && (
                <p className="text-gray-400 text-sm animate-pulse">{message}</p>
            )}
        </div>
    )
}
