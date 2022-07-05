//import { findAllByDisplayValue } from "@testing-library/react";
export const initialState = {
    user: null,
    playlists: [],
    
   
    playing: false,
    item: null,
    //token: null,
    //remove after developing
    //token: "BQBIukMs42z0lhnwlzTiru8YpnrsPprvk8STdF02f2qPap-invGdkljYIvUSh3s09rpqQkg-sXj9MvFpzqCWD1uyB0ePRFkgo7kk5YQbhie9gCHQhMPg9fTZJK-Amw0eHnwqhOlj7e1c79__SRV7xb0o47GnDcr_URLc3Jnuk12DPTIMy0vF_dNF2JHyL0_eWtBMGONPm0UjcQMW",
  };

  const reducer = (state, action) =>{
    console.log(action);

    switch(action.type){
        case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
      case "SET_TOKEN":
        return {
          ...state,
          token: action.token,
        };
        case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
        case "SET_ITEM":
      return {
        ...state,
        item: action.item,
      };
        case "SET_TOP_ARTISTS":
      return {
        ...state,
        top_artists: action.top_artists,
      };
        case "SET_PLAYLISTS":
            return {
              ...state,
              playlists: action.playlists,
        };
        case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };

        case "SET_DISCOVER_WEEKLY":
            return {
            ...state,
            discover_weekly: action.discover_weekly,
        };    
      default:
        return state;  
    }
  };
  export default reducer;
