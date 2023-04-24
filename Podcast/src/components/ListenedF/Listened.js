import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState'

import { Link } from "react-router-dom";

const Listened = () => {
    const { watched } = useContext(GlobalContext)
    return (
        <>
            <div className="movie-page">
                <div className="container">
                    <div className="header">
                        <h1 className="heading">Listened PodCasts</h1>
                    
                        <div className="count-pill">
                            {watched.length}Podcasts
                        </div>
                    </div>

                    {watched.length > 0 ?
                        (
                            <div className="movie-grid">
                                {watched.map((watchedPodcast) => (
                                    {/* <PodCastCard key={watchedPodcast.id} movie={watchedPodcast} type="watched" /> */}
                                ))}
                            </div>
                        )
                        :
                        (
                            <>
                                <h2 className="no-movies">No Podcast in your list, add some!</h2>
                                <button className="btn"><Link to="/">ListenList</Link></button>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Listened
