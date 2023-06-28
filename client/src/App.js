import { Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage'
import SignIn from "./components/SignIn";
import CreateAccount from "./components/CreateAccount";
import Destination from "./components/Destination";
import Hotel from "./components/Hotel";
import Cart from "./components/Cart";
import Booking from "./components/Booking";
import CheckoutSuccess from "./components/CheckoutSuccess";
import HotelList from "./components/HotelList";
import DestinationList from "./components/DestinationList";
import MyAccount from "./components/MyAccount"
import './app.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/sign-in' element={<SignIn/>}></Route>
      <Route path='/create-account' element={<CreateAccount/>}></Route>
      <Route exact path='/destination/:id' element={<Destination/>}></Route>
      <Route exact path='/hotel/:id' element={<Hotel/>}></Route>
      <Route exact path='/cart/:id' element={<Cart/>}></Route>
      <Route exact path='/booking/:id' element={<Booking/>}></Route>
      <Route path='/checkout-success' element={<CheckoutSuccess/>}></Route>
      <Route path='/hotels' element={<HotelList/>}></Route>
      <Route path='/destinations' element={<DestinationList/>}></Route>
      <Route path='/my-account' element={<MyAccount/>}></Route>
    </Routes>
  );
}

export default App;
