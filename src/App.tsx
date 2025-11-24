import React from 'react';
import { Quiz } from './components/Quiz';
// import './index.css'; // この行もCSSフレームワークのインポートなので、削除または別途用意したCSSのパスに変更します

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Quiz />
    </div>
  );
};

export default App;