import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import Header from './components/Header';
import GameCard from './components/GameCard';
import { GAMES, PARTY_DETAILS, SCHEDULE, WELCOME_MESSAGE } from './constants';
import { MapPin, Calendar, Clock, Heart, Utensils, MessagesSquare, Gamepad2, Copy, Check } from 'lucide-react';

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'yes' | 'maybe'>('idle');

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(PARTY_DETAILS.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-xmas-cream font-sans text-xmas-brown overflow-x-hidden pb-20">
      <Snowfall />
      
      <main className="max-w-md mx-auto relative z-10 px-4">
        <Header />

        {/* Intro Card */}
        <section className="bg-white p-6 rounded-3xl shadow-xl mb-6 transform hover:scale-[1.01] transition-transform duration-300 border-2 border-xmas-red/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-xmas-red via-xmas-green to-xmas-gold"></div>
          <h2 className="text-xl font-bold mb-4 text-xmas-green flex items-center gap-2">
            <Heart className="fill-xmas-red text-xmas-red animate-pulse" />
            親愛的夥伴們
          </h2>
          <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-700 whitespace-pre-line">
            <p>今年聖誕夜，誠摯邀請你們來我的三重小私宅聚聚。</p>
            <p className="font-medium bg-orange-50 p-3 rounded-lg border-l-4 border-orange-300 italic">
              {WELCOME_MESSAGE}
            </p>
          </div>
        </section>

        {/* Info Card */}
        <section className="bg-xmas-red text-white p-6 rounded-3xl shadow-xl mb-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-xmas-gold opacity-20 rounded-full blur-2xl"></div>
          
          <h2 className="text-2xl font-display font-bold mb-6 text-center border-b border-white/20 pb-2">🌟 活動詳情</h2>
          
          <div className="space-y-5 relative z-10">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs opacity-80 uppercase tracking-wider">Date</p>
                <p className="font-bold text-lg">{PARTY_DETAILS.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-full">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs opacity-80 uppercase tracking-wider">Time</p>
                <p className="font-bold text-lg">{PARTY_DETAILS.time}</p>
                <p className="text-xs opacity-90">下班後慢慢過來，我們等你！</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-full mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs opacity-80 uppercase tracking-wider">Location</p>
                <p className="font-bold text-lg leading-tight mb-2">{PARTY_DETAILS.location}</p>
                
                <div className="flex gap-2">
                  <a 
                    href={PARTY_DETAILS.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-white text-xmas-red text-center py-2 rounded-lg text-sm font-bold shadow-md hover:bg-gray-100 transition-colors"
                  >
                    開啟地圖
                  </a>
                  <button 
                    onClick={handleCopyAddress}
                    className="bg-black/20 text-white px-3 py-2 rounded-lg hover:bg-black/30 transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="mb-8">
          <h2 className="text-2xl font-display font-bold text-center text-xmas-green mb-6 flex items-center justify-center gap-2">
            <span>🥂</span> 聚會三部曲
          </h2>
          
          <div className="space-y-4">
            {SCHEDULE.map((item, index) => (
              <div key={item.id} className="bg-white p-5 rounded-2xl shadow-md border-l-8 border-xmas-gold flex gap-4">
                <div className="mt-1">
                  {item.iconType === 'food' && <Utensils className="w-6 h-6 text-xmas-gold" />}
                  {item.iconType === 'chat' && <MessagesSquare className="w-6 h-6 text-xmas-gold" />}
                  {item.iconType === 'game' && <Gamepad2 className="w-6 h-6 text-xmas-gold" />}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {index + 1}. {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Games Grid */}
        <section className="mb-10">
          <div className="text-center mb-4">
            <span className="bg-xmas-green text-white text-xs py-1 px-3 rounded-full">精選遊戲</span>
            <h2 className="text-2xl font-display font-bold text-xmas-brown mt-2">今晚玩什麼？</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {GAMES.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Simple RSVP / Footer Interaction */}
        <section className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border border-white text-center mb-8">
          <h3 className="font-bold text-lg mb-4 text-xmas-red">你準備好參加了嗎？</h3>
          
          {rsvpStatus === 'idle' ? (
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setRsvpStatus('yes')}
                className="bg-xmas-green hover:bg-green-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all"
              >
                🎄 當然要去！
              </button>
              <button 
                onClick={() => setRsvpStatus('maybe')}
                className="bg-xmas-gold hover:bg-yellow-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all"
              >
                🤔 讓我想想
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              {rsvpStatus === 'yes' ? (
                <div className="text-xmas-green font-bold text-xl">
                  太棒了！期待見到你！🎁
                </div>
              ) : (
                <div className="text-xmas-brown font-bold text-lg">
                  沒問題，我們等你確認喔！✨
                </div>
              )}
              <button 
                onClick={() => setRsvpStatus('idle')}
                className="text-xs text-gray-400 mt-2 underline"
              >
                重置
              </button>
            </div>
          )}
        </section>

        <footer className="text-center text-xmas-brown/60 text-xs pb-4">
          <p>© 2025 Christmas Party Invitation</p>
          <p className="mt-1">Designed with Warmth ❤️</p>
        </footer>

      </main>
    </div>
  );
};

export default App;