import './App.css';

import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import {LogIn} from './components/login/login';
import {Register} from './components/register/register';
import {Abc} from './components/abc'
import {Experience} from './components/addExperience/experience'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogIn/>}/>
          <Route path="abc" element={<Abc/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="experience" element={<Experience/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
