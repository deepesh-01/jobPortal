import * as api from '../api/api';
import Cookie from 'universal-cookie';

const cookies = new Cookie();

export const login = (input) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        console.log("input at login action : ", input);
        const user = await api.login(input);
        console.log("user : ",user);
        console.log("user from login action : ",user.data);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            console.log("Server Down");
            return false;
        }
        else{
            cookies.set('jwt',user.data.jwt);
            dispatch({type:"LOGIN", user:user.data});
            return true;
        } 
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            const errmsg = err.response.data;
            console.log("Error message : ",errmsg);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}

export const register = (input) => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        console.log("input at register : ",input);
        const user = await api.register(input);
        console.log("user from register action : ",user.data);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        dispatch({type:"REGISTER", user:user.data});
        return true
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            const errmsg = err.response.data;
            console.log("Error message : ",err.response);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}

export const verify = () => async (dispatch) => {
    try{
        dispatch({type:"LOAD"});
        const user = await api.verify();
        console.log("user from register action : ",user.data);
        if(!user){
            dispatch({type:"ERROR",msg:"Server Error"});
            return false;
        }
        dispatch({type:"VERIFY", user:user.data});
        return true
    }
    catch(err){
        if(!err.response){
            const errmsg = { "msg" : "Server is not reachable!" };
            dispatch({type:"ERROR", msg:errmsg});
        }
        else{
            const errmsg = err.response.data;
            console.log("Error message : ",err.response);
            dispatch({type:"ERROR", msg:errmsg});
            return false;
        }
    }
}