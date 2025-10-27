import React, { useState } from 'react';
import Header from './Header';
import BootAnimation from './BootAnimation';
import ChatConsole from './ChatConsole';

const SupportPage: React.FC = () => {
  // Initialize state directly from sessionStorage.
  // If 'edBootShown' is null (not set), `!null` becomes `true`, so we show the animation.
  // If 'edBootShown' exists, `!string` becomes `false`, so we skip it.
  const [booting, setBooting] = useState(!sessionStorage.getItem('edBootShown'));

  const handleBootComplete = () => {
    sessionStorage.setItem('edBootShown', 'true');
    setBooting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {booting ? (
          <BootAnimation onComplete={handleBootComplete} />
        ) : (
          <ChatConsole />
        )}
      </main>
    </div>
  );
};

export default SupportPage;