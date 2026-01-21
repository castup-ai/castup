import { useParams } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import Button from '../../components/Button'
import Modal from '../../components/Modal'

export default function ViewCastingCall() {
    const { id } = useParams()
    const { user } = useAuth()
    const { castingCalls, applyCastingCall } = useData()
    const casting = castingCalls.find(c => c.id === parseInt(id))
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [applicationMessage, setApplicationMessage] = useState('')
    const [applying, setApplying] = useState(false)

    if (!casting) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="glass-card p-12 text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold mb-2">Casting Call Not Found</h2>
                </div>
            </div>
        )
    }

    const handleApply = () => {
        setApplying(true)
        setTimeout(() => {
            applyCastingCall(casting.id, user.id, applicationMessage)
            setApplying(false)
            setShowApplyModal(false)
            setApplicationMessage('')
        }, 1000)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="glass-card p-8 mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-4xl font-display font-bold mb-2">{casting.projectTitle}</h1>
                            <p className="text-xl text-gold-400 mb-2">{casting.targetRole}</p>
                            <p className="text-gray-400">Posted by {casting.creatorName || 'Unknown'}</p>
                        </div>
                        <span className={`badge ${casting.status === 'Open' ? 'badge-primary' : 'bg-gray-500/20'}`}>
                            {casting.status}
                        </span>
                    </div>

                    {casting.status === 'Open' && (
                        <Button variant="primary" onClick={() => setShowApplyModal(true)} className="w-full md:w-auto">
                            🎯 Apply Now
                        </Button>
                    )}
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-card p-6">
                            <h2 className="text-2xl font-display font-bold mb-4">Description</h2>
                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                {casting.description}
                            </p>
                        </div>

                        {casting.requiredSkills && casting.requiredSkills.length > 0 && (
                            <div className="glass-card p-6">
                                <h2 className="text-2xl font-display font-bold mb-4">Required Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {casting.requiredSkills.map((skill, index) => (
                                        <span key={index} className="badge-primary px-4 py-2">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="font-bold text-white mb-4">Details</h3>
                            <div className="space-y-3">
                                {casting.location && (
                                    <div>
                                        <p className="text-sm text-gray-400">Location</p>
                                        <p className="text-white">📍 {casting.location}</p>
                                    </div>
                                )}
                                {casting.compensation && (
                                    <div>
                                        <p className="text-sm text-gray-400">Compensation</p>
                                        <p className="text-white">💰 {casting.compensation}</p>
                                    </div>
                                )}
                                {casting.deadline && (
                                    <div>
                                        <p className="text-sm text-gray-400">Deadline</p>
                                        <p className="text-white">📅 {new Date(casting.deadline).toLocaleDateString()}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm text-gray-400">Applications</p>
                                    <p className="text-white">👥 {casting.applications?.length || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} title="Apply for this Role">
                <div className="space-y-4">
                    <p className="text-gray-300">
                        Tell the casting director why you're perfect for this role in <strong>{casting.projectTitle}</strong>.
                    </p>
                    <textarea
                        className="input-field min-h-[150px]"
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        placeholder="Introduce yourself and explain why you're a great fit..."
                    />
                    <div className="flex gap-4">
                        <Button variant="secondary" onClick={() => setShowApplyModal(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleApply} loading={applying} className="flex-1">
                            Submit Application
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
