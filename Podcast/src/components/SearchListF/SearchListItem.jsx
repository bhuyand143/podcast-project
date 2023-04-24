import { Add, PlayArrow, Star, ThumbDownOutlined,ThumbUpAltOutlined } from '@material-ui/icons';
import {React, useState, useEffect} from 'react';
import './SearchList.scss';
import axios from "axios";
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const SearchListItem = ({movie}) => {
  
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

    <div className='listItem1'>
        <Link className='link' to = {'/watch'} state = {{movie : movie}}>
      <img src={movie.img} alt={movie.title} />
        </Link>
      <div className="itemInfo">
      <div class="listitemdetails1">
        <nav><b>{movie.title}</b> </nav>  
        {/* <a onClick={()=>{handleFavoriteClick(movie._id)}}>
        
        {JSON.parse(localStorage.getItem('users')).favourite.includes(movie._id) ? <Star /> : <StarBorderIcon />}</a> */}
        </div>
        <div className="desc">
          <br/>

         {movie.desc.slice(0, 50)+"..."}
        
        </div>
        </div>
        
    </div>

  );
}

export default SearchListItem;
