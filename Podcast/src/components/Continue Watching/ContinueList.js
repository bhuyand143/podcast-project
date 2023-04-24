import React, { useContext, useState,useEffect } from 'react'
import { GlobalContext } from '../../context/GlobalState'
// import PodCastCard from '../PodcastF/PodCastCard'
import { Link } from "react-router-dom";
import List from '../ListF/List';
import { ArrowBackOutlined } from '@material-ui/icons';
import Header from '../HeaderF/Header';
import ListContinue from '../ListFContinue/ListContinue';


const ContinueList= () => {
    const [cr_list, setcr_list] = useState({})
    useEffect(() => {
        const user_get = JSON.parse(localStorage.getItem("users"));
        let list_c =[];
        user_get.continue.map((value)=>{
            list_c.push([value.podcast,value.time])
        })
        if(user_get && user_get.continue.length)
        {
            console.log(list_c);
        const cr_list1 = {
            title : "Continue Watching",
            "category" : "favourite",
            "content" : list_c
        }
        setcr_list(cr_list1);
    }
    }, [])
    
    
    return (
    <>
     <Header />
            <div className="movie-page2">
                    
                <div className="container2">
                    {cr_list.content && cr_list.content.length > 0 ?
                        (
                         <ListContinue key={cr_list.title} list={cr_list} />
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

export default ContinueList
