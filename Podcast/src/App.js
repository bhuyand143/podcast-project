import React, {useState } from 'react';
import { BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'; 
import './App.css';
// importing components
import Listened from "./components/ListenedF/Listened";
import Signup from './components/UsersF/Signup';
import SignIn from './components/UsersF/SignIn';
import FavList from './components/FavouriteListF/FavList'; 
import Home from './components/HomeF/Home';
import Alert from './components/Alert';
import Watch from './components/WatchF/Watch';
import ContinueList from './components/Continue Watching/ContinueList';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }



  

  return (
      <div>
        <Alert alert={alert}/>
          <Routes>
            <Route exact path="/" element={!localStorage.getItem('users')?<Navigate to="/signin" />:<Home showAlert={showAlert}/>} />
            <Route exact path="/home" element={ <Home showAlert={showAlert} />} />
            <Route exact path="/listened" element={ <Listened showAlert={showAlert} />}/>
            <Route exact path="/watchlist" element={!localStorage.getItem('users')?<Navigate to="/signin" />:<FavList showAlert={showAlert} />}/>
            <Route exact path="/continue" element={!localStorage.getItem('users')?<Navigate to="/signin" />:<ContinueList showAlert={showAlert} />}/>
            <Route exact path="/signin/" element={localStorage.getItem('users')?<Navigate to="/" />:<SignIn showAlert={showAlert}/>}/>  
            <Route exact path="/signup/" element={localStorage.getItem('users')?<Navigate to="/" />:<Signup showAlert={showAlert}/>}/>
            <Route exact path="/watch/" element= {!localStorage.getItem('users')?<Navigate to="/signin" />:<Watch showAlert={showAlert}/>}/>
          </Routes>
      </div>
  );
}

export default App;
