import React from 'react';
import './App.css';
import Form from './components/Form';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="App container">
      <header>
        <h1>Awesome Website!</h1>
        <SearchBar />
      </header>
      <Form />
    </div>
  );
}

export default App;
