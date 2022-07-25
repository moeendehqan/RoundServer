import {Routes , Route} from 'react-router-dom'
import Header from './componet/header/Header'
import Register from './page/sing/register';
import VerificationCode from './page/sing/VerificationCode';
import Confirmed from './page/sing/confirmed';
import Login from './page/sing/login';
import Forget from './page/sing/forget';
import ChangePassword from './page/sing/changepassword';
import Market from './page/market/market';
import BuyPer from './page/market/BuyPer';
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='register' element={<Register/>}/>
        <Route path='verification' element={<VerificationCode/>}/>
        <Route path='confirmed' element={<Confirmed/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='forget' element={<Forget/>}/>
        <Route path='changepassword' element={<ChangePassword/>}/>
        <Route path='market' element={<Market/>}>
          <Route path='buyper' element={<BuyPer/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
