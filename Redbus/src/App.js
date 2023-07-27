import './App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
// import "@fontsource/montserrat";
import BusList from './components/BusList';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import BuslistAdmin from './components/BuslistAdmin';
import { Router } from 'react-router-dom';
import RouterComponents from './components/RouterComponents';
import History from './components/History';
import Demo from './components/Demo';
import Cancel from './components/Cancel';

function App() {
  return (
    <div className="App">
      <Router history={History}>
        <RouterComponents/>
      </Router>
      {/* <Demo/> */}
      {/* <Cancel/> */}
    </div>
  );
}

export default App;
