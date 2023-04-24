import React, { useContext, useState,useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState'
// import PodCastCard from '../PodcastF/PodCastCard'
import { Link } from "react-router-dom";
import List from '../ListF/List';
import { ArrowBackOutlined } from '@material-ui/icons';
import Header from '../HeaderF/Header';


const FavList= () => {
    const [cr_list, setcr_list] = useState({})
    useEffect(() => {
        const user_get = JSON.parse(localStorage.getItem("users"));
        console.log(user_get);
        if(user_get)
        {
        const cr_list1 = {
            title : "Favourite Podcast",
            "category" : "favourite",
            "content" : user_get.favourite
        }
        setcr_list(cr_list1);
    }
    }, [])
    
    
    return (
    <>
     <Header />
            <div className="movie-page">
                    
                <div className="container">
                    {cr_list.content && cr_list.content.length > 0 ?
                        (
                         <List key={cr_list.title} list={cr_list} />
                        )
                        :
                        (
                            <>
                                <h2 className="no-movies">No Podcast in your list, add some!</h2>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default FavList
