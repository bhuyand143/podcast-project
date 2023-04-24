export const AppReducer = (state, action) => {
    switch(action.type){
        case "ADD_TO_WATCHLIST":
            return {
                ...state, 
                watchlist: [action.payload, ...state.watchlist],   // adds the new movie to the existing array of watchlist
                watched: state.watched.filter((podcast) => podcast.id !== action.payload.id)
            }
        case "REMOVE_FROM_WATCHLIST":
            return {
                ...state, 
                watchlist: state.watchlist.filter((podcast) => podcast.id !== action.payload)   // removes/filters out the matching movie from the existing array of watchlist
            }
        case "ADD_TO_WATCHEDLIST":
            return {
                ...state, 
                watched: [action.payload, ...state.watched],    // adds the new movie to the existing array of watched array
                watchlist: state.watchlist.filter((podcast) => podcast.id !== action.payload.id )
            }
        case "REMOVE_FROM_WATCHEDLIST":
            return {
                ...state, 
                watched: state.watched.filter((podcast) => podcast.id !== action.payload),
            }

        default:
            return state;
    }
}