import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import { useAI } from '../../context/AIContext'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { ArrowLeft } from 'lucide-react'

export default function CreatePortfolio() {
    const { user } = useAuth()
    const { createProfile } = useData()
    const { analyzeProfile } = useAI()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: user?.name || '',
        role: user?.role || user?.department || '',
        bio: '',
        location: '',
        skills: '',
        experience: '',
        portfolio: '',
        demoReel: '',
        socialLinks: {
            imdb: '',
            youtube: '',
            instagram: '',
        },
    })

    const [aiSuggestions, setAiSuggestions] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleSocialChange = (platform, value) => {
        setFormData({
            ...formData,
            socialLinks: { ...formData.socialLinks, [platform]: value }
        })
    }

    const handleAnalyze = () => {
        const analysis = analyzeProfile({
            ...formData,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        })
        setAiSuggestions(analysis)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            const profileData = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                userId: user.id,
            }

            createProfile(profileData)
            setLoading(false)
            navigate('/dashboard')
        }, 1000)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-display font-bold mb-2">
                        Create Your <span className="text-gradient">Portfolio</span>
                    </h1>
                    <p className="text-gray-400">Showcase your talent and get discovered by industry professionals</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Full Name"
                                    value={formData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                                <Input
                                    label="Role/Department"
                                    value={formData.role}
                                    onChange={(e) => handleChange('role', e.target.value)}
                                    placeholder="Actor"
                                    required
                                />
                            </div>

                            <Input
                                label="Location"
                                value={formData.location}
                                onChange={(e) => handleChange('location', e.target.value)}
                                placeholder="Mumbai, India"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                <textarea
                                    className="input-field min-h-[120px]"
                                    value={formData.bio}
                                    onChange={(e) => handleChange('bio', e.target.value)}
                                    placeholder="Tell us about yourself, your experience, and what makes you unique..."
                                    required
                                />
                            </div>

                            <Input
                                label="Skills (comma-separated)"
                                value={formData.skills}
                                onChange={(e) => handleChange('skills', e.target.value)}
                                placeholder="Method Acting, Improv, Dance, Martial Arts"
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
                                <textarea
                                    className="input-field min-h-[100px]"
                                    value={formData.experience}
                                    onChange={(e) => handleChange('experience', e.target.value)}
                                    placeholder="List your projects, roles, and achievements..."
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-white">Social Links</h3>
                                <Input
                                    label="IMDb"
                                    value={formData.socialLinks.imdb}
                                    onChange={(e) => handleSocialChange('imdb', e.target.value)}
                                    placeholder="https://imdb.com/name/..."
                                    icon="🎬"
                                />
                                <Input
                                    label="YouTube"
                                    value={formData.socialLinks.youtube}
                                    onChange={(e) => handleSocialChange('youtube', e.target.value)}
                                    placeholder="https://youtube.com/@..."
                                    icon="▶️"
                                />
                                <Input
                                    label="Instagram"
                                    value={formData.socialLinks.instagram}
                                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                                    placeholder="@username"
                                    icon="📸"
                                />
                            </div>

                            <div className="flex gap-4 pt-6">
                                <Button type="button" variant="secondary" onClick={handleAnalyze} className="flex-1">
                                    🤖 Get AI Suggestions
                                </Button>
                                <Button type="submit" variant="primary" loading={loading} className="flex-1">
                                    Create Portfolio
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* AI Suggestions Sidebar */}
                    <div className="space-y-6">
                        {aiSuggestions ? (
                            <>
                                {/* Completeness */}
                                <div className="glass-card p-6">
                                    <h3 className="font-bold text-white mb-4">Profile Completeness</h3>
                                    <div className="relative h-4 bg-dark-700 rounded-full overflow-hidden mb-2">
                                        <div
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-500"
                                            style={{ width: `${aiSuggestions.completeness}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-400">{aiSuggestions.completeness}% complete</p>
                                </div>

                                {/* Suggestions */}
                                {aiSuggestions.suggestions.length > 0 && (
                                    <div className="glass-card p-6">
                                        <h3 className="font-bold text-white mb-4">💡 AI Suggestions</h3>
                                        <div className="space-y-3">
                                            {aiSuggestions.suggestions.map((suggestion, index) => (
                                                <div key={index} className={`p-3 rounded-lg ${suggestion.priority === 'high' ? 'bg-red-500/10 border border-red-500/30' :
                                                    suggestion.priority === 'medium' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                                                        'bg-blue-500/10 border border-blue-500/30'
                                                    }`}>
                                                    <p className="text-sm text-gray-200">{suggestion.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Hashtags */}
                                {aiSuggestions.hashtags.length > 0 && (
                                    <div className="glass-card p-6">
                                        <h3 className="font-bold text-white mb-4">#️⃣ Suggested Hashtags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {aiSuggestions.hashtags.map((tag, index) => (
                                                <span key={index} className="badge-primary text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {aiSuggestions.recommendedTags.length > 0 && (
                                    <div className="glass-card p-6">
                                        <h3 className="font-bold text-white mb-4">🏷️ Recommended Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {aiSuggestions.recommendedTags.map((tag, index) => (
                                                <span key={index} className="badge-secondary text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="glass-card p-6 text-center">
                                <div className="text-5xl mb-4">🤖</div>
                                <p className="text-gray-400 mb-4">Fill out your profile and click "Get AI Suggestions" to receive personalized recommendations!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
