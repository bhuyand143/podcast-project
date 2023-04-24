import React, { useContext, useEffect, useState } from "react";
import Search from "../SearchF/Search";
import List from "../ListF/List";
import { GlobalContext } from "../../context/GlobalState";
import Header from "../HeaderF/Header";
import axios from "axios";
import './Home.css';
import FavList from "../FavouriteListF/FavList";
import SearchList from '../SearchListF/SearchList';

function Home() {
  const context = useContext(GlobalContext);
  const { input } = context;

  const [lists, setLists] = useState([]);
  const [podcast, setPodcast] = useState([]);
  const [filtered,setfiltered] = useState([]);
  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get("http://localhost:8900/api/lists");
        // , {
        //   headers: {
        //     token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDM4MjA4YmI1MmRmYzUwZDU1MjA0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjI4MjMxNSwiZXhwIjoxNjgyNzE0MzE1fQ.Jz9XKU95rCt_KFCBrfM99V7kUnqlLeihT_wL1DiblBE`,
        //   },
        // });
        // console.log(res.data)
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getList()

    const getPodcast = async () => {
      try {
        const res1 = await axios.get(`http://localhost:8900/api/podcast`);
        // , {
        //   headers: {
        //     token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDM4MjA4YmI1MmRmYzUwZDU1MjA0NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjI4MjMxNSwiZXhwIjoxNjgyNzE0MzE1fQ.Jz9XKU95rCt_KFCBrfM99V7kUnqlLeihT_wL1DiblBE`,
        //   },
        // });
        // console.log(res.data)
        setPodcast(res1.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPodcast()
  }, []);
  console.log(filtered);
  console.log("Hello")
  useEffect(() => {
    if(input === "")
    {
      setfiltered([]);
    }
    else{

      console.log(input);
      const filtered_rows = podcast.filter((pod)=>{
        return (
          (pod.title.toLowerCase().includes(input.toLowerCase())) ||
          (pod.speaker.toLowerCase().includes(input.toLowerCase())) || 
          (pod.category.toLowerCase().includes(input.toLowerCase()))
        );
      });
      setfiltered(filtered_rows);
      // setfiltered(podcast.filter((pod)=> { return 
        // pod.title.toLowerCase().includes(input)
        // (pod.speaker.includes(input)) ||
        //  pod.category.includes(input) )}
      // }))
    }
  }, [input])
  
  useEffect(() => {
  
    console.log(filtered)
  }, [filtered])
  
 console.log(podcast)
  return (
    <div className=".main">
      <Header />
      <Search />
      {input === "" ? (
        <>
        
        {lists?.map((list)=>(

          <List key={list._id} list={list} />
        ))}
        </> 
       ) : (
        <SearchList podcasts ={filtered} />
       )}  
   </div>
  );
}

export default Home;
