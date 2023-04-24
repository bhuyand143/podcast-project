import React, { useContext, useState } from 'react';
import TextField from "@mui/material/TextField";
import "./Search.css";
import { GlobalContext } from '../../context/GlobalState';

function Search() {
  const [inputText, setInputText] = useState("");
  const context=useContext(GlobalContext);
  const {setInput}=context;

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    setInput(lowerCase);
  };

  return (
    <div className="main">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search Podcast"
        />
      </div>
    </div>
  );
}


export default Search;