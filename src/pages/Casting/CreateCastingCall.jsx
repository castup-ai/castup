import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import Input from '../../components/Input'
import Button from '../../components/Button'

export default function CreateCastingCall() {
    const { user } = useAuth()
    const { createCastingCall } = useData()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        projectTitle: '',
        targetRole: '',
        description: '',
        requiredSkills: '',
        location: '',
        compensation: '',
        deadline: '',
    })

    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        setTimeout(() => {
            createCastingCall({
                ...formData,
                requiredSkills: formData.requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
                createdBy: user.id,
                creatorName: user.name,
            })
            setLoading(false)
            navigate('/casting')
        }, 1000)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-display font-bold mb-2">
                        Create <span className="text-gradient">Casting Call</span>
                    </h1>
                    <p className="text-gray-400">Post a casting opportunity and find the perfect talent</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                    <Input
                        label="Project Title"
                        value={formData.projectTitle}
                        onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                        placeholder="e.g., Indie Drama Feature Film"
                        required
                    />

                    <Input
                        label="Target Role"
                        value={formData.targetRole}
                        onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                        placeholder="e.g., Lead Actor, Supporting Actress"
                        required
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                        <textarea
                            className="input-field min-h-[150px]"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe the role, project, and what you're looking for..."
                            required
                        />
                    </div>

                    <Input
                        label="Required Skills (comma-separated)"
                        value={formData.requiredSkills}
                        onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                        placeholder="e.g., Method Acting, Hindi, Dancing"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="Mumbai, India"
                        />
                        <Input
                            label="Compensation"
                            value={formData.compensation}
                            onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                            placeholder="₹50,000 - ₹1,00,000"
                        />
                    </div>

                    <Input
                        label="Application Deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="secondary" onClick={() => navigate('/casting')} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={loading} className="flex-1">
                            Post Casting Call
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
