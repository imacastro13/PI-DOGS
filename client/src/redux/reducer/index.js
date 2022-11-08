import { GET_DOGS, FILTER_TEMPERAMENTS, GET_TEMPERAMENTS, SORT_BY_NAME, SORT_BY_WEIGHT, SEARCH_BREED, GET_DETAIL } from "../actions";

const initialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
    dogDetails: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload
            }
        case GET_TEMPERAMENTS:
            const temperaments = action.payload.map((temp) => temp.name)
            return{
                ...state,
                temperaments,
            }
        case GET_DETAIL:
            return{
                ...state,
                dogDetails: action.payload
            }
        case FILTER_TEMPERAMENTS:
            return{
                ...state,
                filteredDogs: action.payload
            }
        case SORT_BY_NAME:
            let dogsOrdered = [...state.filteredDogs]
            dogsOrdered = dogsOrdered.sort((a, b) => {
                if (a.name < b.name){
                    return action.payload === "asc" ? -1 : 1
                }
                if (a.name > b.name){
                    return action.payload === "desc" ? -1 : 1
                }
                return 0
            })
            return{
                ...state,
                filteredDogs: dogsOrdered
            }
        case SORT_BY_WEIGHT:
            return{
                ...state,
                filteredDogs: action.payload
            }
        case SEARCH_BREED:
            return{
                ...state,
                filteredDogs: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;