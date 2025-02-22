import React, { useEffect, useState } from 'react';
import { Bot, Server, Users, Hash, Clock, Lock, Github, Disc as Discord, MessageSquare } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Commands from './pages/Commands';

interface DiscordWidget {
  id: string;
  name: string;
  instant_invite: string;
  presence_count: number;
  members: {
    id: string;
    username: string;
    status: string;
    avatar_url: string;
  }[];
}

function Home({ serverData }: { serverData: DiscordWidget | null }) {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-6">
                Meet <span className="text-[#5865f2]">Hibki</span>, Your Ultimate Discord Bot
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Enhance your Discord server with powerful moderation, fun commands, and seamless integration. Join {serverData?.presence_count || '1,000+'} users already using Hibki Bot!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href={serverData?.instant_invite} 
                  className="bg-[#5865f2] px-6 py-3 rounded-md hover:bg-[#4752c4] transition flex items-center justify-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Discord className="w-5 h-5" />
                  Add to Discord
                </a>
                <a 
                  href="https://discord.gg/TJFXRqMVCd" 
                  className="bg-[#2b2d31] px-6 py-3 rounded-md hover:bg-[#222427] transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Support Server
                </a>
              </div>
            </div>
            <div className="flex-1">
              <iframe 
                src="https://discord.com/widget?id=1255698759673708605&theme=dark" 
                width="100%" 
                height="500" 
                allowtransparency="true"
                frameBorder="0" 
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="rounded-lg shadow-2xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#2b2d31]">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-[#5865f2]" />}
              title="24/7 Online"
              description="Always available to serve your community with 99.9% uptime guarantee."
            />
            <FeatureCard 
              icon={<Lock className="w-8 h-8 text-[#5865f2]" />}
              title="Advanced Security"
              description="Powerful moderation tools to keep your server safe and clean."
            />
            <FeatureCard 
              icon={<Github className="w-8 h-8 text-[#5865f2]" />}
              title="Open Source"
              description="Transparent and community-driven development process."
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Statistics</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard icon={<Server />} value={serverData?.presence_count ? `${serverData.presence_count}+` : '100+'} label="Active Users" />
            <StatCard icon={<Users />} value={serverData?.members?.length ? `${serverData.members.length}+` : '10,000+'} label="Members" />
            <StatCard icon={<Hash />} value="1,000+" label="Channels" />
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [serverData, setServerData] = useState<DiscordWidget | null>(null);

  useEffect(() => {
    fetch('https://discord.com/api/guilds/1255698759673708605/widget.json')
      .then(response => response.json())
      .then(data => setServerData(data))
      .catch(error => console.error('Error fetching Discord data:', error));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#1a1b1e] text-white">
        {/* Navbar */}
        <nav className="bg-[#2b2d31] border-b border-[#1e1f22]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link to="/" className="flex items-center space-x-2">
                  <Bot className="w-8 h-8 text-[#5865f2]" />
                  <span className="text-xl font-bold">Hibki Bot</span>
                </Link>
              </div>
              <div className="hidden md:flex space-x-6">
                <Link to="/#features" className="hover:text-[#5865f2] transition">Features</Link>
                <Link to="/#stats" className="hover:text-[#5865f2] transition">Statistics</Link>
                <Link to="/commands" className="hover:text-[#5865f2] transition">Commands</Link>
              </div>
              <a 
                href={serverData?.instant_invite || "https://discord.com/oauth2/authorize"} 
                className="bg-[#5865f2] px-4 py-2 rounded-md hover:bg-[#4752c4] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Discord
              </a>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home serverData={serverData} />} />
          <Route path="/commands" element={<Commands />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-[#2b2d31] border-t border-[#1e1f22] py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Bot className="w-6 h-6 text-[#5865f2]" />
                  <span className="font-bold">{serverData?.name || 'Hibki Bot'}</span>
                </div>
                <p className="text-gray-400">Making Discord servers better, one command at a time.</p>
              </div>
              <div>
                <h3 className="font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/#features" className="hover:text-white transition">Features</Link></li>
                  <li><Link to="/#stats" className="hover:text-white transition">Statistics</Link></li>
                  <li><Link to="/commands" className="hover:text-white transition">Commands</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="https://github.com/Ridwantegar" className="hover:text-white transition">GitHub</a></li>
                  <li><a href="https://discord.gg/TJFXRqMVCd" className="hover:text-white transition">Support</a></li>
                  <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-[#1e1f22] text-center text-gray-400">
              <p>© 2024 {serverData?.name || 'Hibki Bot'}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-[#1a1b1e] p-6 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode, value: string, label: string }) {
  return (
    <div className="bg-[#2b2d31] p-8 rounded-lg">
      <div className="flex justify-center mb-4 text-[#5865f2]">{icon}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default App;