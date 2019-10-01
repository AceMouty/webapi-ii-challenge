import React from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import PostList from './components/PostList/PostList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Posts</h1>
        <PostList/>
      </header>
    </div>
  );
}

export default App;
