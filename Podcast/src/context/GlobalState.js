import React, { createContext, useReducer, useEffect, useState } from "react"; 
import { AppReducer } from "./AppReducer";

// initial value of store
const initialState = {
    watchlist: localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : [],
    watched: localStorage.getItem("watched") ? JSON.parse(localStorage.getItem("watched")) : [],
};
// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const [input,setInput] = useState("");

    // saving to local storage
    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist))
        localStorage.setItem("watched", JSON.stringify(state.watched))
    }, [state])

    
    // actions
    const addToWatchList = (movie) => {
        dispatch({ type: "ADD_TO_WATCHLIST", payload: movie})
    }

    const removeFromWatchList = (id) => {
        dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: id})
    }
    const addToWatchedList = (movie) => {
        dispatch({ type: "ADD_TO_WATCHEDLIST", payload: movie})
    }
    const removeFromWatchedList = (id) => {
        dispatch({ type: "REMOVE_FROM_WATCHEDLIST", payload: id})
    }

    return(
        <GlobalContext.Provider value={{ 
            watchlist: state.watchlist, 
            watched: state.watched,
            addToWatchList,
            removeFromWatchList,
            addToWatchedList,
            removeFromWatchedList,
            input,
            setInput
            // dispatch,  //we can directly pass the diaptch function also instead of creating functions for individual actions like addMovieToWatchList()
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

