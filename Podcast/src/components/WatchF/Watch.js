import { ArrowBackOutlined } from '@material-ui/icons';
import {React,useState,useEffect} from 'react';
import './Watch.scss';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"; 

const Watch = () => {
  const location = useLocation();
  const [currentTime, setCurrentTime] = useState(0);
  console.log(currentTime)
  const handleContinue = async(id,podcast,time)=>{
    try {
      const res = await axios.post('http://localhost:8900/api/users/continue',{id,podcast,time},{
        headers : {
            token : "Bearer " + JSON.parse(localStorage.getItem("users")).accessToken,
        },
    })
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(location.state.time)
    {
      document.getElementById('player').currentTime= location.state.time
    }
  }, []);
  return (
    <div className='watch'>
     <Link to = '/' onClick={()=>{handleContinue( JSON.parse(localStorage.getItem("users"))._id,location.state.movie._id,currentTime)}}>
       <div className="back">
        <ArrowBackOutlined />
        Home
       </div>
     </Link>
       <video id='player' src={location.state.movie.file} onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)} className='video' autoPlay progress controls></video>
    </div>
  );
}

export default Watch;
