import React from 'react';
import { Home, Gamepad2, Wallet } from 'lucide-react';
import { WalletModal } from './WalletModal';

export function Navigation() {
  const [showWalletModal, setShowWalletModal] = React.useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm">
      <button className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white/90 transition-colors">
        <img src="https://cdn.freewebstore.com/origin/919667/untitleddesign26_1735355837408.png" 
             alt="Home" 
             className="w-6 h-6" />
        <span className="font-semibold">Home</span>
      </button>
      
      <button className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white/90 transition-colors">
        <Gamepad2 className="w-6 h-6" />
        <span className="font-semibold">Lobby</span>
      </button>
      
      <button 
        onClick={() => setShowWalletModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-lg hover:bg-white/90 transition-colors"
      >
        <Wallet className="w-6 h-6" />
        <span className="font-semibold">Wallet</span>
      </button>

      <WalletModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  );
}