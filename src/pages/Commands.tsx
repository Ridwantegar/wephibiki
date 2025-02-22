import React from 'react';
import { Music, Volume2, Repeat, Play } from 'lucide-react';

interface Command {
  name: string;
  description: string;
  usage: string;
  icon: React.ReactNode;
}

const musicCommands: Command[] = [
  {
    name: 'play',
    description: 'Play a song from YouTube, Spotify, or SoundCloud',
    usage: '/play <song name or URL>',
    icon: <Play className="w-6 h-6" />,
  },
  {
    name: 'autoplay',
    description: 'Toggle autoplay mode to automatically queue similar songs',
    usage: '/autoplay',
    icon: <Repeat className="w-6 h-6" />,
  },
  {
    name: 'volume',
    description: 'Adjust the volume of the music (0-100)',
    usage: '/volume <0-100>',
    icon: <Volume2 className="w-6 h-6" />,
  },
];

function Commands() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Bot Commands</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore all the available commands to make the most of Hibki Bot's features.
          </p>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Music className="w-8 h-8 text-[#5865f2]" />
            <h2 className="text-2xl font-bold">Music Commands</h2>
          </div>
          
          <div className="grid gap-6">
            {musicCommands.map((command) => (
              <div
                key={command.name}
                className="bg-[#2b2d31] rounded-lg p-6 hover:bg-[#32353b] transition"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#1a1b1e] rounded-lg text-[#5865f2]">
                    {command.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{command.name}</h3>
                    <p className="text-gray-400 mb-3">{command.description}</p>
                    <div className="bg-[#1a1b1e] p-2 rounded font-mono text-sm text-gray-300">
                      {command.usage}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commands;