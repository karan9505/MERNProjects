import './App.css';
import { Router } from 'react-router-dom';
import Routercomponents from './components/Routercomponents';
import History from './components/History';


function App() {
  return (
    <div className="App">
      <Router history={History}>
        <Routercomponents/>
      </Router>
    </div>
  );
}

export default App;
