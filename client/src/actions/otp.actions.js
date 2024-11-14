import axios from "../helpers/axios";

export const getOTP = (email) => {
    return async (dispatch) => {

        const response = await axios.post('/send-otp', { email });
        dispatch({
            type: "success get otp",
            payload: { response }
        })
        console.log(response)
        return response.data

    }
}