import React, { useEffect, useRef } from 'react';
import { Box } from './components/box/box';
import './App.scss';

function App() {
  const serialNumber = '4815162342';

  return (
    <main className="app">
      <Box serialNumber={serialNumber} />
    </main>
  );
}

export default App;
