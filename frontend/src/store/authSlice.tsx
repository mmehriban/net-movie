import { createSlice } from "@reduxjs/toolkit";
import { sendLoginData } from "../api/authApi";
import { sendRegisterData } from "../api/authApi";


const initialState = {
    username: '',
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginInfo: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        setRegisterInfo: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        }
    }
})

export const {setLoginInfo, setRegisterInfo} = authSlice.actions;

export default authSlice.reducer;

// 1 version
// export const loginAction = (username: any, password: any) => {
//     return (dispatch: any) => {sendLoginData(username, password)
//         .then(response => {
//             const { token } = response.data;
//             dispatch(setLoginInfo({ username: username, token: token }));
//         })
//         .catch(error => {
//             // Handle the error here
//             console.error('Login failed:', error);
//             // Optionally dispatch an action to store the error state in Redux
//         });
//     };
// };

export const loginAction = (username: any, password: any) => {
    return async (dispatch: any) => {
        try {
            const response = await sendLoginData(username, password);
            const { token } = response.data;
            dispatch(setLoginInfo({ username, token }));
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally dispatch an action to store the error state in Redux
        }
    };
};


export const registerAction = (username: any, first_name: any, last_name: any, email: any,  gender: any, birthday: any, password: any) => {
    return (dispatch: any) => {sendRegisterData(username, first_name, last_name, email,  gender, birthday, password)
        .then(response => {
            const { token } = response.data;
            dispatch(setRegisterInfo({ username, token, first_name, last_name, email, gender, birthday })); // Include all fields in the payload
        })
        .catch(error => {
            console.error('Registration failed:', error); // Log the error
            // Optionally dispatch an action to store the error state in Redux
        });
    };
};
