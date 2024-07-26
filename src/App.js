import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './Routes/Navbar';
import HomeScreen from './Screens/Home/HomeScreen';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
