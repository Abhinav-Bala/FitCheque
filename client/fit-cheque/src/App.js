import './components/HomePage'
import './App.css';
import Homepage from './components/HomePage';
import Lobby from './components/game/Lobby';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Homepage/>}/>
          <Route path='/play' exact element={<Lobby/>}/>
        </Routes> 
      </BrowserRouter>   
    </div>
  );
}

export default App;
