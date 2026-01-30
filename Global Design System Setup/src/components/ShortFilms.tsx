import { useState } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Play, ThumbsUp, MessageSquare, Share2, Upload, TrendingUp, Star } from 'lucide-react';
import { Badge } from './ui/badge';

export default function ShortFilms() {
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);

  const mockFilms = [
    {
      id: '1',
      title: 'The Last Summer',
      creator: 'Emma Richardson',
      duration: '12:34',
      thumbnail: 'https://images.unsplash.com/photo-1574923930958-9b653a0e5148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydCUyMGZpbG0lMjBjaW5lbWElMjBzY3JlZW58ZW58MXx8fHwxNzU5MzA4NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A coming-of-age story about finding yourself in the last summer before college.',
      likes: 1234,
      comments: 89,
      views: 15420,
      genre: 'Drama',
      featured: true,
    },
    {
      id: '2',
      title: 'Midnight Dreams',
      creator: 'Marcus Chen',
      duration: '8:15',
      thumbnail: 'https://images.unsplash.com/photo-1616527546362-bf6b7f80a751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcHJvZHVjdGlvbiUyMGNpbmVtYXxlbnwxfHx8fDE3NTkzMDg2MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A psychological thriller that blurs the lines between reality and dreams.',
      likes: 2341,
      comments: 156,
      views: 28900,
      genre: 'Thriller',
      featured: false,
    },
    {
      id: '3',
      title: 'City Lights',
      creator: 'Sarah Mitchell',
      duration: '15:42',
      thumbnail: 'https://images.unsplash.com/photo-1610961672119-2c9c1afd55b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGRpcmVjdG9yJTIwZXF1aXBtZW50fGVufDF8fHx8MTc1OTMwODYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'An exploration of urban life through the eyes of street performers.',
      likes: 897,
      comments: 45,
      views: 9876,
      genre: 'Documentary',
      featured: true,
    },
    {
      id: '4',
      title: 'The Comedian',
      creator: 'James Wilson',
      duration: '10:20',
      thumbnail: 'https://images.unsplash.com/photo-1574923930958-9b653a0e5148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9ydCUyMGZpbG0lMjBjaW5lbWElMjBzY3JlZW58ZW58MXx8fHwxNzU5MzA4NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      description: 'A struggling comedian finds hope in unexpected places.',
      likes: 1567,
      comments: 78,
      views: 18340,
      genre: 'Comedy',
      featured: false,
    },
  ];

  const handlePlayFilm = (filmId: string) => {
    setSelectedFilm(filmId);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A5A] to-[#FFC107] flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl text-[#3C3C3C]" style={{ fontWeight: 700 }}>
              Short Films
            </h1>
          </div>
          <p className="text-[#6B6B6B] text-lg">
            Discover and share incredible short films from creators worldwide
          </p>
        </div>

        <Button className="bg-[#FF7A5A] hover:bg-[#FF6A4A] text-white rounded-lg flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Film
        </Button>
      </div>

      {/* Full Screen Player */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setSelectedFilm(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-2xl backdrop-blur-sm transition-colors"
          >
            ×
          </button>
          <div className="w-full max-w-6xl aspect-video bg-gray-900 flex items-center justify-center">
            <div className="text-white text-center">
              <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
              <p>Video Player (Demo)</p>
              <p className="text-sm opacity-70 mt-2">Film ID: {selectedFilm}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white border border-[rgba(0,0,0,0.1)] rounded-xl p-1">
          <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            All Films
          </TabsTrigger>
          <TabsTrigger value="featured" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            Featured
          </TabsTrigger>
          <TabsTrigger value="trending" className="rounded-lg data-[state=active]:bg-[#FF7A5A] data-[state=active]:text-white">
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFilms.map((film) => (
              <FilmCard key={film.id} film={film} onPlay={handlePlayFilm} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFilms.filter(f => f.featured).map((film) => (
              <FilmCard key={film.id} film={film} onPlay={handlePlayFilm} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFilms.sort((a, b) => b.views - a.views).map((film) => (
              <FilmCard key={film.id} film={film} onPlay={handlePlayFilm} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FilmCard({ film, onPlay }: { film: any; onPlay: (id: string) => void }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-[#FF7A5A]/10 to-[#FFC107]/10 group cursor-pointer">
        <img
          src={film.thumbnail}
          alt={film.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onPlay(film.id)}
            className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transform hover:scale-110 transition-transform"
          >
            <Play className="w-7 h-7 text-[#FF7A5A] ml-1" />
          </button>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-white text-sm">
          {film.duration}
        </div>
        {film.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#FFC107] rounded-full flex items-center gap-1 text-white text-sm">
            <Star className="w-4 h-4" />
            <span style={{ fontWeight: 600 }}>Featured</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg text-[#3C3C3C] flex-1 line-clamp-1" style={{ fontWeight: 600 }}>
            {film.title}
          </h3>
          <Badge variant="outline" className="border-[#FF7A5A] text-[#FF7A5A] ml-2">
            {film.genre}
          </Badge>
        </div>

        <p className="text-sm text-[#6B6B6B] mb-1">by {film.creator}</p>
        <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-2">{film.description}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-4">
          <div className="flex items-center gap-1">
            <Play className="w-4 h-4" />
            <span>{film.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{film.likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" />
            <span>{film.comments}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={() => setLiked(!liked)}
            variant="outline"
            className={`flex-1 rounded-lg flex items-center justify-center gap-2 ${
              liked ? 'bg-[#FF7A5A] text-white border-[#FF7A5A]' : ''
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            {liked ? 'Liked' : 'Like'}
          </Button>
          <Button variant="outline" className="flex-1 rounded-lg flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Comment
          </Button>
          <Button variant="outline" className="px-3 rounded-lg">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
