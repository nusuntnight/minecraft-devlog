import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef(null);

  // Sample songs - you can replace these with your own music files
  const playlist = [
    {
      title: "Ian - Champion",
      artist: "Ian",
      url: "/music/champion.mp3"
    },
    {
      title: "Ian - 1 Aprilie",
      artist: "Ian", 
      url: "/music/1-aprilie.mp3"
    },
    {
      title: "Ian - Tiki Taka",
      artist: "Ian",
      url: "/music/tiki-taka.mp3"
    }
  ];

  // Add autoplay attribute to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.setAttribute('autoplay', '');
      audioRef.current.setAttribute('muted', ''); // Start muted to bypass restrictions
    }
  }, []);

  const currentSong = playlist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set default volume to 30%
      audioRef.current.loop = true; // Enable loop for the current song
      
      // Try to auto-play immediately
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Auto-play started successfully
            setHasUserInteracted(true);
            console.log('Auto-play successful');
          })
          .catch(error => {
            // Auto-play was prevented
            console.log('Auto-play prevented:', error);
            
            // Try alternative approach - set muted and play
            audioRef.current.muted = true;
            audioRef.current.play().then(() => {
              console.log('Muted auto-play successful');
              // Unmute after a short delay
              setTimeout(() => {
                audioRef.current.muted = false;
                setHasUserInteracted(true);
              }, 100);
            }).catch(err => {
              console.log('Even muted auto-play failed:', err);
            });
          });
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Enable loop for the current song
    }
  }, [currentSongIndex]);

  const toggleMute = () => {
    if (audioRef.current) {
      // If this is the first user interaction, unmute and start playing
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        audioRef.current.muted = false;
        audioRef.current.play().catch(error => {
          console.log('Play failed:', error);
        });
      }
      
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    // Auto-play the new song if user has interacted
    if (hasUserInteracted) {
      setTimeout(() => {
        audioRef.current.play().catch(error => {
          console.log('Play failed:', error);
        });
      }, 100);
    }
  };

  const previousSong = () => {
    const prevIndex = currentSongIndex === 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    // Auto-play the new song if user has interacted
    if (hasUserInteracted) {
      setTimeout(() => {
        audioRef.current.play().catch(error => {
          console.log('Play failed:', error);
        });
      }, 100);
    }
  };

  const handleEnded = () => {
    // Auto-play next song when current song ends
    nextSong();
  };

  return (
    <>
             {/* Hidden audio element */}
       <audio
         ref={audioRef}
         src={currentSong.url}
         onEnded={handleEnded}
         autoPlay
         muted
       />

      {/* Music Player Controls - Bottom Right Corner */}
      <div className="fixed bottom-6 right-6 z-50">
                 {/* Main Mute Button */}
         <button
           onClick={toggleMute}
           className="w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center backdrop-blur-sm"
           style={{
             backgroundColor: isMuted ? 'rgba(239, 68, 68, 0.9)' : 'rgba(105, 43, 224, 0.9)',
             boxShadow: isMuted 
               ? '0 10px 25px rgba(239, 68, 68, 0.4), 0 0 20px rgba(239, 68, 68, 0.3)' 
               : '0 10px 25px rgba(105, 43, 224, 0.4), 0 0 20px rgba(105, 43, 224, 0.3)'
           }}
         >
           {isMuted ? (
             <VolumeX className="w-6 h-6 text-white" />
           ) : (
             <Volume2 className="w-6 h-6 text-white" />
           )}
         </button>
         
         {/* Start Music Button - Only show if user hasn't interacted yet */}
         {!hasUserInteracted && (
           <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 animate-pulse"
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.9)',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)'
                }}>
             <span className="text-white">▶</span>
           </div>
         )}

        {/* Expandable Player */}
        {showPlayer && (
          <div className="absolute bottom-16 right-0 w-80 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300"
               style={{ backgroundColor: 'rgba(105, 43, 224, 0.9)' }}>
            {/* Current Song Info */}
            <div className="text-center mb-4">
              <h3 className="text-white font-semibold text-sm truncate">{currentSong.title}</h3>
              <p className="text-purple-200 text-xs">{currentSong.artist}</p>
            </div>

                         {/* Playback Controls */}
             <div className="flex items-center justify-center space-x-4 mb-4">
               <button
                 onClick={previousSong}
                 className="p-2 rounded-full transition-colors hover:bg-purple-600/50"
               >
                 <SkipBack className="w-5 h-5 text-white" />
               </button>
               
               <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(186, 157, 241, 0.8)' }}>
                 <span className="text-white text-xs font-bold">♪</span>
               </div>
               
               <button
                 onClick={nextSong}
                 className="p-2 rounded-full transition-colors hover:bg-purple-600/50"
               >
                 <SkipForward className="w-5 h-5 text-white" />
               </button>
             </div>

            {/* Playlist */}
            <div className="max-h-32 overflow-y-auto">
              <h4 className="text-white text-xs font-medium mb-2">Playlist</h4>
              <div className="space-y-1">
                {playlist.map((song, index) => (
                  <button
                    key={index}
                                         onClick={() => {
                       setCurrentSongIndex(index);
                       // Auto-play the selected song if user has interacted
                       if (hasUserInteracted) {
                         setTimeout(() => {
                           audioRef.current.play().catch(error => {
                             console.log('Play failed:', error);
                           });
                         }, 100);
                       }
                     }}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                      index === currentSongIndex
                        ? 'bg-purple-600/50 text-white'
                        : 'text-purple-200 hover:bg-purple-600/30'
                    }`}
                  >
                    <div className="truncate">{song.title}</div>
                    <div className="truncate opacity-75">{song.artist}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

                 {/* Toggle Player Button */}
         <button
                       onClick={() => {
              setShowPlayer(!showPlayer);
              // If this is the first user interaction, unmute and start playing
              if (!hasUserInteracted) {
                setHasUserInteracted(true);
                audioRef.current.muted = false;
                audioRef.current.play().catch(error => {
                  console.log('Play failed:', error);
                });
              }
            }}
           className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110"
           style={{ 
             backgroundColor: 'rgba(186, 157, 241, 0.9)',
             boxShadow: '0 4px 12px rgba(186, 157, 241, 0.4)'
           }}
         >
           <span className="text-white">♪</span>
         </button>
      </div>
    </>
  );
};

export default MusicPlayer; 