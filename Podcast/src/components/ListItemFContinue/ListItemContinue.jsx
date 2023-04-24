import { Add, PlayArrow, ThumbDownOutlined,ThumbUpAltOutlined } from '@material-ui/icons';
import {React, useState, useEffect} from 'react';
import './ListItemContinue.scss';
import axios from "axios";
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ListItemContinue = ({index, item}) => {
  const [isHovered, setisHovered] = useState(false);
  const [movie, setmovie] = useState({});
  
  useEffect(() => {
    console.log(item[0]);
   
    const getMovie = async()=>{
      try {
        
        const mov = await axios('http://localhost:8900/api/podcast/find/'+item[0]);
        console.log(mov.data);
        setmovie(mov.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie();
  }, [item]);
  console.log(movie);

  

  

  const handleFavoriteClick = async (itemId) => {
    // const itemId = movie._id;
    const user_g = JSON.parse(localStorage.getItem('users'));
    const favorites = user_g.favourite;
    try {
      const res = await axios.post('http://localhost:8900/api/users/favourite',{id:user_g._id,podcast:itemId})
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
    
   
    const itemIndex = favorites.findIndex(item => item === itemId);
    if (itemIndex === -1) {
      favorites.push(itemId)
    } else {
      // const newFavorites = [...favorites];
      favorites.splice(itemIndex, 1);
      // setFavorites(newFavorites);
    }

    user_g.favourite = favorites;
    localStorage.setItem('users',JSON.stringify(user_g));

  };




  return (

    <div className='listItem'>
        <Link className='link' to = {'/watch'} state = {{movie : movie, time:item[1]}}>
      <img src={movie?.img} alt={movie?.title} />
        </Link>

      <div className="itemInfo">
      <div class="listitemdetails">
        <nav>{movie?.title}</nav>  
        <a onClick={()=>{handleFavoriteClick(movie?._id)}}><StarBorderIcon/></a>
        </div>
        {isHovered && (
         <>
         {/* <video src="" controls autoPlay={true}  loop></video> */}
        <div className="itemInfoTop">
          <span>{movie?.speaker}</span>
          <span>{movie?.type}</span>
        </div>
        <div className="desc">
         {movie?.desc}
        </div>
        <div className="genre">{movie?.category}</div>
        </>
        )}
      </div>
    </div>

  );
}

export default ListItemContinue;
