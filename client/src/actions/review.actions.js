import { venueConstants, addVenueConstants } from "./constants";
import axios from '../helpers/axios';



export const addReview = (payload) => {
    return async (dispatch) => {

        const response = await axios.post('/review', { ...payload });
        dispatch({
            type: "success added review",
            payload: { response }
        })
        console.log(response)
        return response.data

    }
}

export const getRating = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`avg_rating/${id}`)
        console.log(response);
        dispatch({ type: "success", payload: { response } })
        return response.data

    }

}



export const getAllReview = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`all_review/${id}`)
        console.log(response);
        dispatch({ type: "success", payload: { response } })
        return response.data
    }

}
export const getUserReview = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`userReview/${id}`)
        console.log(response.data)
        dispatch({ type: 'success', payload: { response } })
        return response.data
    }
}
export const updateReview = (data) => {
    return async (dispatch) => {
        const response = await axios.patch('/', data)
        dispatch({ type: 'success', payload: { response } })
        return response.data
    }
}
