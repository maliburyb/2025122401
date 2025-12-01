import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center pt-12 pb-6 px-4 relative z-10">
      <div className="inline-block relative">
        <div className="absolute -top-6 -left-6 text-4xl animate-bounce" style={{ animationDuration: '2s' }}>🎄</div>
        <div className="absolute -bottom-2 -right-6 text-4xl animate-bounce" style={{ animationDuration: '2.5s' }}>🎅</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-xmas-red mb-2 drop-shadow-sm">
          2025 聖誕私宅聚會
        </h1>
      </div>
      <div className="mt-2 bg-xmas-green text-white inline-block px-4 py-1 rounded-full text-sm font-bold shadow-lg transform -rotate-1">
        麻雀雖小，五臟俱全
      </div>
    </header>
  );
};

export default Header;