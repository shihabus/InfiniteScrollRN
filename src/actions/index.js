import { FETCH_FAILED,FETCH_STARTED,FETCH_SUCCESS,NEW_FETCH } from "./type";
import base64 from 'react-native-base64'

const CLIENT_ID = '' 
const CLIENT_SECRET = '' 
const AUTHKEY = base64.encode(CLIENT_ID + ':' + CLIENT_SECRET)


export const fetchImages=(page,query,oldQuery)=>{
    return(dispatch)=>{
      dispatch({
        type:FETCH_STARTED,
        payload:query
      })
        fetch(`https://api.shutterstock.com/v2/images/search?query=${query}&page=${page}`, {
          method: 'GET',
          headers:{
            Authorization: 'Basic ' + AUTHKEY
          }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log('response',result.total_count)
            if(result.total_count===0){
              return dispatch({
                type:FETCH_FAILED
              })
            }
            dispatch({
                type:FETCH_SUCCESS,
                payload:result.data
            })
        })
        .catch(()=>{
          dispatch({
            type:FETCH_FAILED
          })
        })


    }
}

export const clearFetch=()=>{
  return({
    type:NEW_FETCH
  })
}