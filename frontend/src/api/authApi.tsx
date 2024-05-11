import { iaxios } from "./iaxios";


export function sendLoginData(user_info: any, password: any){
    return iaxios.post('/login/', {user_info, password})
}

export function sendRegisterData(
    username: any,
    first_name: any,
    last_name: any,
    email: any,
    gender: any,
    birthday: any,
    password: any
  ) {
    return iaxios.post('/register/', {  username, first_name, last_name, email,  gender, birthday, password });
  }