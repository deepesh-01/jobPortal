export default (
    initialState = {
        user:null,
        experiences:[],
        education:[],
        load:false,
        error:false},
        action
        ) => {
    switch(action.type){
        case "LOGIN":
            return {...initialState,user:action.user,load:false,error:false}
        case "LOGOUT":
            return {...initialState,user:null,load:false,error:false}
        case "REGISTER":
            return {...initialState,user:action.user,load:false,error:false}
        case "VERIFY":
            return {...initialState,user:action.user,load:false,error:false}
        default:
            return {...initialState}
    }

}