import React, { useEffect } from 'react';
import { Box } from './components/box/box';
import './App.scss';
import { setCookie } from './lib/utils';

function App() {
  // useEffect(() => {
  //   setCookie('box_delay', 'time', 1.2);
  // }, []);

  // eslint-disable-next-line no-console

  return (
    <main className="app">
      <Box serialNumber="4815162342" />
    </main>
  );
}

export default App;
