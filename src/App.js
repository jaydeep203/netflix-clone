import './App.scss';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';

function App() {
  return <Router>
      <Header />
    <Routes>
      <Route path='/netflix-clone' element={<Home />} />
    </Routes>
  </Router>
}

export default App;
