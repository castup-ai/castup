import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Eye, Film } from 'lucide-react';

export default function ProfileCard({ profile, showActions = true }) {
    return (
        <Card className="hover:shadow-xl transition-shadow group">
            <CardContent className="p-6">
                {/* Profile Image */}
                <div className="relative mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-[#FF7A5A]/20 to-[#FFC107]/20 rounded-xl overflow-hidden">
                        {profile.profileImage || profile.profilePicture ? (
                            <img
                                src={profile.profileImage || profile.profilePicture}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl text-[#FF7A5A]">
                                👤
                            </div>
                        )}
                    </div>
                    {profile.verified && (
                        <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                            ✓
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div className="space-y-3">
                    <div>
                        <h3 className="text-xl font-bold text-[#3C3C3C] group-hover:text-[#FF7A5A] transition-colors">
                            {profile.name}
                        </h3>
                        <p className="text-sm text-[#6B6B6B]">{profile.role || profile.department}</p>
                        {profile.location && (
                            <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mt-1">
                                <MapPin className="w-3 h-3" />
                                <span>{profile.location}</span>
                            </div>
                        )}
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <p className="text-sm text-[#6B6B6B] line-clamp-2">
                            {profile.bio}
                        </p>
                    )}

                    {/* Skills */}
                    {profile.skills && profile.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {profile.skills.slice(0, 3).map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {skill}
                                </Badge>
                            ))}
                            {profile.skills.length > 3 && (
                                <span className="text-xs text-[#6B6B6B]">+{profile.skills.length - 3} more</span>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-[#6B6B6B] pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            <span>{profile.views || 0} views</span>
                        </div>
                        {profile.experience && (
                            <div className="flex items-center gap-2">
                                <Film className="w-4 h-4" />
                                <span>{profile.experience.length || 0} projects</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {showActions && (
                        <div className="flex gap-2 pt-2">
                            <Link to={`/portfolio/${profile.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                    View Profile
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                                ⭐
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
