import { createContext, useContext } from 'react'

const AIContext = createContext()

export function useAI() {
    const context = useContext(AIContext)
    if (!context) {
        throw new Error('useAI must be used within AIProvider')
    }
    return context
}

export function AIProvider({ children }) {

    // AI Profile Analysis - Analyzes portfolio and gives suggestions
    const analyzeProfile = (profileData) => {
        const suggestions = []

        // Check completeness
        if (!profileData.bio || profileData.bio.length < 100) {
            suggestions.push({
                type: 'bio',
                message: 'Add a detailed bio (at least 100 characters) to improve discoverability',
                priority: 'high'
            })
        }

        if (!profileData.skills || profileData.skills.length < 3) {
            suggestions.push({
                type: 'skills',
                message: 'Add at least 3 skills to better match with opportunities',
                priority: 'high'
            })
        }

        if (!profileData.experience || profileData.experience.length === 0) {
            suggestions.push({
                type: 'experience',
                message: 'Add your experience to build credibility',
                priority: 'medium'
            })
        }

        if (!profileData.demoReel && !profileData.portfolio?.length) {
            suggestions.push({
                type: 'media',
                message: 'Upload a demo reel or portfolio images to showcase your work',
                priority: 'high'
            })
        }

        // Generate hashtag suggestions
        const hashtags = generateHashtags(profileData)

        return {
            suggestions,
            hashtags,
            completeness: calculateCompleteness(profileData),
            recommendedTags: extractTags(profileData),
        }
    }

    // Generate relevant hashtags based on profile
    const generateHashtags = (profileData) => {
        const hashtags = []
        const role = profileData.role || profileData.department

        const roleHashtags = {
            Actor: ['#Actor', '#Talent', '#CastingCall', '#FilmActor', '#ActorLife'],
            Actress: ['#Actress', '#Talent', '#CastingCall', '#FilmActress', '#ActressLife'],
            Director: ['#Director', '#Filmmaker', '#IndieFilm', '#FilmDirector', '#Cinema'],
            Producer: ['#Producer', '#FilmProducer', '#IndieFilm', '#ProductionHouse'],
            Editor: ['#Editor', '#FilmEditor', '#PostProduction', '#VideoEditor'],
            Cinematographer: ['#Cinematographer', '#DOP', '#Cinematography', '#FilmMaking'],
            'Sound Engineer': ['#SoundEngineer', '#AudioPost', '#SoundDesign', '#FilmAudio'],
        }

        hashtags.push(...(roleHashtags[role] || ['#FilmIndustry', '#CreativeWork']))

        // Add skill-based hashtags
        if (profileData.skills) {
            profileData.skills.forEach(skill => {
                hashtags.push(`#${skill.replace(/\s+/g, '')}`)
            })
        }

        return [...new Set(hashtags)].slice(0, 10) // Return unique hashtags, max 10
    }

    // Extract tags from bio and experience
    const extractTags = (profileData) => {
        const tags = new Set()

        const text = `${profileData.bio || ''} ${profileData.skills?.join(' ') || ''}`.toLowerCase()

        const keywords = [
            'comedy', 'drama', 'action', 'thriller', 'horror', 'romance', 'sci-fi',
            'experienced', 'beginner', 'professional', 'trained', 'award', 'certified',
            'bollywood', 'hollywood', 'indie', 'webseries', 'shortfilm', 'feature',
            'method acting', 'improv', 'voice over', 'dubbing', 'stage', 'theatre'
        ]

        keywords.forEach(keyword => {
            if (text.includes(keyword)) {
                tags.add(keyword.charAt(0).toUpperCase() + keyword.slice(1))
            }
        })

        return Array.from(tags).slice(0, 8)
    }

    // Calculate profile completeness percentage
    const calculateCompleteness = (profileData) => {
        let score = 0
        const checks = [
            { field: 'bio', weight: 15, min: 100 },
            { field: 'skills', weight: 15, min: 3 },
            { field: 'experience', weight: 20, min: 1 },
            { field: 'portfolio', weight: 20, min: 1 },
            { field: 'profileImage', weight: 10, min: 1 },
            { field: 'demoReel', weight: 15, min: 1 },
            { field: 'socialLinks', weight: 5, min: 1 },
        ]

        checks.forEach(check => {
            const value = profileData[check.field]
            if (Array.isArray(value)) {
                if (value.length >= check.min) score += check.weight
            } else if (typeof value === 'string') {
                if (value.length >= check.min) score += check.weight
            } else if (value) {
                score += check.weight
            }
        })

        return Math.min(100, score)
    }

    // AI Casting Match - Matches profiles with casting calls
    const matchCasting = (castingCall, profiles) => {
        return profiles.map(profile => {
            let score = 0
            const reasons = []

            // Role match
            if (castingCall.role && profile.role === castingCall.role) {
                score += 40
                reasons.push('Exact role match')
            }

            // Skills match
            if (castingCall.requiredSkills && profile.skills) {
                const matchingSkills = profile.skills.filter(skill =>
                    castingCall.requiredSkills.some(req =>
                        req.toLowerCase().includes(skill.toLowerCase()) ||
                        skill.toLowerCase().includes(req.toLowerCase())
                    )
                )
                if (matchingSkills.length > 0) {
                    score += matchingSkills.length * 10
                    reasons.push(`${matchingSkills.length} matching skills`)
                }
            }

            // Experience level
            if (profile.experience && profile.experience.length >= (castingCall.minExperience || 0)) {
                score += 20
                reasons.push('Sufficient experience')
            }

            // Location match (if both have location data)
            if (castingCall.location && profile.location &&
                castingCall.location.toLowerCase() === profile.location.toLowerCase()) {
                score += 15
                reasons.push('Same location')
            }

            // Portfolio availability
            if (profile.demoReel || (profile.portfolio && profile.portfolio.length > 0)) {
                score += 15
                reasons.push('Portfolio available')
            }

            return {
                profile,
                matchScore: Math.min(100, score),
                matchReasons: reasons,
                recommended: score >= 50,
            }
        }).sort((a, b) => b.matchScore - a.matchScore)
    }

    // Generate NLP-style summary from bio
    const generateSummary = (text, maxLength = 150) => {
        if (!text) return ''

        // Simple extractive summarization
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
        if (sentences.length === 0) return ''

        // Take first two sentences or up to maxLength
        let summary = sentences[0].trim()
        if (summary.length < maxLength && sentences.length > 1) {
            summary += '. ' + sentences[1].trim()
        }

        if (summary.length > maxLength) {
            summary = summary.substring(0, maxLength) + '...'
        }

        return summary + '.'
    }

    // Recommend opportunities based on user profile
    const recommendOpportunities = (userProfile, allCastingCalls) => {
        const matches = matchCasting({ role: userProfile.role, requiredSkills: userProfile.skills },
            allCastingCalls.map(c => ({ ...c, role: c.targetRole })))

        return matches
            .filter(m => m.matchScore >= 40)
            .slice(0, 5)
            .map(m => ({
                ...m.profile,
                reason: m.matchReasons.join(', '),
                matchScore: m.matchScore,
            }))
    }

    const value = {
        analyzeProfile,
        generateHashtags,
        extractTags,
        calculateCompleteness,
        matchCasting,
        generateSummary,
        recommendOpportunities,
    }

    return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}
