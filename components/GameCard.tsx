import React from 'react';
import { Game } from '../types';
import { Ghost, Palette, Castle } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const getIcon = () => {
    switch (game.iconType) {
      case 'camel': return <Ghost className="w-8 h-8" />; // Using Ghost as a placeholder for Camel (funny vibes)
      case 'art': return <Palette className="w-8 h-8" />;
      case 'castle': return <Castle className="w-8 h-8" />;
      default: return <Ghost className="w-8 h-8" />;
    }
  };

  return (
    <div className={`p-4 rounded-xl border-2 transform hover:-translate-y-1 transition-all duration-300 shadow-md ${game.color}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-white rounded-full bg-opacity-60">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-display font-bold text-xl leading-none">{game.name}</h3>
          <span className="text-xs font-bold opacity-70 uppercase tracking-wider">{game.enName}</span>
        </div>
      </div>
      <p className="text-sm font-medium leading-relaxed opacity-90">
        {game.description}
      </p>
    </div>
  );
};

export default GameCard;