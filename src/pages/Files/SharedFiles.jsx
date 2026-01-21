export default function SharedFiles() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold mb-2">
                        Shared <span className="text-gradient">Files</span>
                    </h1>
                    <p className="text-gray-400">Files shared with you by other users</p>
                </div>

                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">📬</div>
                    <h3 className="text-xl font-bold mb-2">No Shared Files</h3>
                    <p className="text-gray-400">Files shared with you will appear here</p>
                </div>
            </div>
        </div>
    )
}
