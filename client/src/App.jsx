import React from 'react';
import Header from './components/Header/Header';
import Clock from './components/Clock/Clock';
import Sidebar from './components/Sidebar/Sidebar';
import MainPanel from './components/MainPanel/MainPanel';
import FeedbackPanel from './components/FeedbackPanel/FeedbackPanel';

function App() {
  return (
    <div className="App">
      <MainPanel />
      <Header />
      <Sidebar />
      <Clock />
      <FeedbackPanel />
    </div>
  );
}

export default App;