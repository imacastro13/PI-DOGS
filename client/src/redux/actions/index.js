import axios from "axios";
export const GET_DOGS = "GET_DOGS"
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const SORT_BY_NAME = "SORT_BY_NAME"
export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT"
export const SEARCH_BREED = "SEARCH_BREED"
export const GET_DETAIL = "GET_DETAIL"


var url = "http://localhost:3001/"

export function getAllDogs(){
    return async function(dispatch){
        var json = await axios.get(url + "dogs")
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        })
    }
};

export function getAllTemperaments(){
    return async function(dispatch){
        var json = await axios.get(url + "temperaments")
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        })
    }
}

export function searchBreed(name){
    return async function(dispatch){
        var json = await axios.get(url + "dogs?name=" + name)
        return dispatch({
            type: "SEARCH_BREED",
            payload: json.data
        })
    }
}

export function getDogDetail(id){
    return async function(dispatch){
        var json = await axios.get(url + "dogs/" + id)
            return dispatch({
                type: "GET_DETAIL",
                payload: json.data
            })
    }
}

export function filterTemperaments(temperament){
    return {
        type: "FILTER_TEMPERAMENTS",
        payload: temperament
    }
};

export function sortByName(order){
    return {
        type: "SORT_BY_NAME",
        payload: order
    }
}

export function sortByWeight(order){
    return {
        type: "SORT_BY_WEIGHT",
        payload: order
    }
}

export function postDog(payload){
    return async function (){
        const data = await axios.post("http://localhost:3001/dog", payload)
        return data
    }
}