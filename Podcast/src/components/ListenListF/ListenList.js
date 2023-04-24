import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalState';

// import { Link } from "react-router-dom";

const ListenList = () => {
    const { watchlist } = useContext(GlobalContext);

    return (
        <>
            <div className="movie-page">
                <div className="container">
                    <div className="header">
                        <h1 className="heading">My ListenList</h1>

                        <div className="count-pill">
                            {watchlist.length}Podcast
                        </div>
                    </div>

                    {watchlist.length > 0 ?
                        (
                            <div className="movie-grid">
                                {watchlist.map((wlist) => (
                                    {/* <PodCastCard key={wlist.id} podcast={wlist} type="watchlist" /> */}
                                ))}
                            </div>
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

export default ListenList
