import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import SignIn from "./components/SignIn";
import CreateAccount from "./components/CreateAccount";
import './app.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/sign-in' element={<SignIn/>}></Route>
      <Route path='/create-account' element={<CreateAccount/>}></Route>
    </Routes>
  );
}

export default App;
