import axios from 'axios';
import Cookie from 'universal-cookie';

const cookies = new Cookie();

axios.defaults.withCredentials = true;

const loginUrl = `http://127.0.0.1:8000/api/login/`;
const registerUrl = `http://127.0.0.1:8000/api/register/`;
const verifyUrl = `http://127.0.0.1:8000/api/me/`;


// {
// headers: {
//     Cookie: "cookie1=value; cookie2=value; cookie3=value;"
// }

export const login = (input) => {
    console.log(input)
    return axios.post(loginUrl,input);
}

export const register = (input) => axios.post(registerUrl,input);

export const verify = () => {
    const token = cookies.get("jwt");
    return axios.get(verifyUrl,{headers: {
        "Content-Type": "application/json",
        'authorization': `Bearer ${token}`
    }});
}
