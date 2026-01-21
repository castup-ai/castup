import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import Button from '../../components/Button'
import Input from '../../components/Input'

export default function ScriptLocker() {
    const { user } = useAuth()
    const { files, uploadFile, shareFile } = useData()
    const [uploading, setUploading] = useState(false)
    const [uploadSource, setUploadSource] = useState('computer') // 'computer', 'youtube', 'instagram'
    const [newFile, setNewFile] = useState({ name: '', description: '', sourceUrl: '', sourceType: 'computer' })
    const [selectedFile, setSelectedFile] = useState(null)

    const myFiles = files.filter(f => f.uploadedBy === user?.id)

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file)
            setNewFile({ ...newFile, name: file.name, sourceType: 'computer' })
        }
    }

    const handleUrlChange = (url) => {
        setNewFile({ ...newFile, sourceUrl: url })

        // Auto-extract name from URL
        if (uploadSource === 'youtube' && url.includes('youtube.com')) {
            const urlParams = new URLSearchParams(new URL(url).search)
            const videoId = urlParams.get('v') || 'YouTube Video'
            setNewFile({ ...newFile, sourceUrl: url, name: `YouTube: ${videoId}`, sourceType: 'youtube' })
        } else if (uploadSource === 'instagram' && url.includes('instagram.com')) {
            setNewFile({ ...newFile, sourceUrl: url, name: 'Instagram Post', sourceType: 'instagram' })
        }
    }

    const handleUpload = (e) => {
        e.preventDefault()
        setUploading(true)
        setTimeout(() => {
            uploadFile({
                ...newFile,
                uploadedBy: user.id,
                uploaderName: user.name,
            })
            setNewFile({ name: '', description: '', sourceUrl: '', sourceType: uploadSource })
            setSelectedFile(null)
            setUploading(false)
        }, 1000)
    }

    const switchSource = (source) => {
        setUploadSource(source)
        setNewFile({ name: '', description: '', sourceUrl: '', sourceType: source })
        setSelectedFile(null)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold mb-2">
                        🔒 Script <span className="text-gradient">Locker</span>
                    </h1>
                    <p className="text-gray-400">Securely upload and share your scripts and confidential files</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Upload Form */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 sticky top-24">
                            <h2 className="text-xl font-bold mb-4">Upload New File</h2>

                            {/* Upload Source Tabs */}
                            <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => switchSource('computer')}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${uploadSource === 'computer'
                                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    💻 Computer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => switchSource('youtube')}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${uploadSource === 'youtube'
                                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    📺 YouTube
                                </button>
                                <button
                                    type="button"
                                    onClick={() => switchSource('instagram')}
                                    className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold transition-all ${uploadSource === 'instagram'
                                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    📷 Instagram
                                </button>
                            </div>

                            <form onSubmit={handleUpload} className="space-y-4">
                                {/* Computer Upload */}
                                {uploadSource === 'computer' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Select File
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                onChange={handleFileSelect}
                                                accept=".pdf,.doc,.docx,.txt,.mp4,.mov,.avi"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                            <div className="input-field cursor-pointer flex items-center justify-center py-8 text-center">
                                                {selectedFile ? (
                                                    <div>
                                                        <div className="text-3xl mb-2">📄</div>
                                                        <div className="text-sm font-semibold text-white">{selectedFile.name}</div>
                                                        <div className="text-xs text-gray-400 mt-1">
                                                            {(selectedFile.size / 1024).toFixed(2)} KB
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="text-3xl mb-2">📤</div>
                                                        <div className="text-sm text-gray-400">Click to select file</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* YouTube Upload */}
                                {uploadSource === 'youtube' && (
                                    <Input
                                        label="YouTube URL"
                                        value={newFile.sourceUrl}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        required
                                    />
                                )}

                                {/* Instagram Upload */}
                                {uploadSource === 'instagram' && (
                                    <Input
                                        label="Instagram URL"
                                        value={newFile.sourceUrl}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        placeholder="https://www.instagram.com/p/..."
                                        required
                                    />
                                )}

                                <Input
                                    label="File Name"
                                    value={newFile.name}
                                    onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                                    placeholder="My Script v2.pdf"
                                    required
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        className="input-field min-h-[100px]"
                                        value={newFile.description}
                                        onChange={(e) => setNewFile({ ...newFile, description: e.target.value })}
                                        placeholder="Brief description..."
                                    />
                                </div>
                                <Button type="submit" variant="primary" loading={uploading} className="w-full">
                                    📤 Upload File
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* File List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold">My Files ({myFiles.length})</h2>
                        {myFiles.length > 0 ? (
                            myFiles.map(file => (
                                <div key={file.id} className="glass-card p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <div className="text-3xl">
                                                    {file.sourceType === 'youtube' ? '📺' : file.sourceType === 'instagram' ? '📷' : '📄'}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{file.name}</h3>
                                                    <p className="text-sm text-gray-400">
                                                        Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                                                        {file.sourceType && file.sourceType !== 'computer' && (
                                                            <span className="ml-2 px-2 py-0.5 bg-gold-500/20 text-gold-400 rounded text-xs">
                                                                {file.sourceType === 'youtube' ? 'YouTube' : 'Instagram'}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            {file.description && (
                                                <p className="text-gray-300 text-sm">{file.description}</p>
                                            )}
                                            {file.sourceUrl && (
                                                <a
                                                    href={file.sourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gold-400 hover:text-gold-300 text-xs mt-2 inline-block"
                                                >
                                                    🔗 {file.sourceUrl}
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <div className="text-sm text-gray-400">
                                            Shared with {file.sharedWith?.length || 0} {file.sharedWith?.length === 1 ? 'person' : 'people'}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="secondary" className="text-sm px-4 py-2">
                                                📤 Share
                                            </Button>
                                            <Button variant="ghost" className="text-sm px-4 py-2">
                                                📥 Download
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="glass-card p-12 text-center">
                                <div className="text-6xl mb-4">📁</div>
                                <h3 className="text-xl font-bold mb-2">No Files Yet</h3>
                                <p className="text-gray-400">Upload your first file to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
