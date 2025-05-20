import axios from "axios"
import { DELETE_FAVORITE_SONG_REQUEST_SUCCESS, FAVORITE_SONG_REQUEST, FAVORITE_SONG_REQUEST_FAIL, FAVORITE_SONG_REQUEST_SUCCESS, POST_FAVORITE_SONG_REQUEST_SUCCESS, UPDATE_FAVORITE_TO_EMPTY } from "./ActionType"
import Cookies from "js-cookie";
import { SONG_REQUEST, SONG_REQUEST_FAIL, SONG_REQUEST_SUCCESS } from "../actionTypes";
// const BaseURL= "https://worried-colt-train.cyclic.app/favorite"
 // Get API URL from the environment variable
 const apiUrl = process.env.REACT_APP_SAREGAMA_API_URL;
// const token = Cookies.get("login_token");
// console.log({Cookiestoken:token})
export const GetAllFavoriteSong = (paramObj, token) => async (dispatch) => {
  
    try {
      dispatch({ type: FAVORITE_SONG_REQUEST });
  
      return await axios
        .get(`${apiUrl}/favorite`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add "Bearer " prefix
          },
        })
        .then((res) => {
          // Dispatch success action with the favorite song data
        console.log(res,"GetAllFavoriteSong")
          dispatch({ type: FAVORITE_SONG_REQUEST_SUCCESS, payload: res.data?.FavoriteSong });
          return res.data;
        })
        .catch((error) => {
          console.log( error ,"errorGetAllFavoriteSong ");
          dispatch({ type: FAVORITE_SONG_REQUEST_FAIL });
        });
    } catch (error) {
      console.log( error ,"error GetAllFavoriteSong");
      dispatch({ type: FAVORITE_SONG_REQUEST_FAIL });
    }
  };
  
export const AddFavoriteSong=(payload,token)=>async dispatch=>{
try {
    dispatch({type:FAVORITE_SONG_REQUEST})
    return await axios.post(`${apiUrl}/favorite/add`,payload,{
        headers: {
          Authorization: `Bearer ${token}`, // Add "Bearer " prefix
        },
      }).then(res=>{
        console.log(res,"AddFavoriteSong")
    dispatch({type:POST_FAVORITE_SONG_REQUEST_SUCCESS})
   
    return res.data
    }).catch(err=>{
        dispatch({type:FAVORITE_SONG_REQUEST_FAIL})
    })
    
} catch (error) {
    dispatch({type:FAVORITE_SONG_REQUEST_FAIL})
}
}



export const DeletFavoriteSong=(id,token)=>async dispatch=>{
    try {
        dispatch({type:FAVORITE_SONG_REQUEST})
        return await axios.delete(`${apiUrl}/favorite/delete/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`, // Add "Bearer " prefix
            },
          }).then(res=>{
        dispatch({type:DELETE_FAVORITE_SONG_REQUEST_SUCCESS})
        return res.data
        }).catch(err=>{
            dispatch({type:FAVORITE_SONG_REQUEST_FAIL})
        })
        
    } catch (error) {
        dispatch({type:FAVORITE_SONG_REQUEST_FAIL})
    }
    }

    export const UpdateSongEmpty=()=> async dispatch=>{
        dispatch({type:UPDATE_FAVORITE_TO_EMPTY})
    }

 

  
    export const fetchSongs = (paramObj) => async (dispatch) => {
      dispatch({ type: SONG_REQUEST });
      console.log(paramObj, "paramObj"); // Log the paramObj for debugging
      try {
        // Ensure paramObj is passed under the 'params' key
        const response = await axios.get(`${apiUrl}/songs?q=${paramObj.params.q}`);
    console.log(response,"response")
        // Dispatch success action with the fetched songs
        dispatch({ type: SONG_REQUEST_SUCCESS, payload: response.data.data });
      } catch (error) {
        console.error("Error fetching songs:", error);
    
        // Dispatch failure action
        dispatch({ type: SONG_REQUEST_FAIL });
      }
    };
    