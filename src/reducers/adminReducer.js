const adminInitialState = {
    isLoading : false,
    isLoggedIn : false,
    errors : {},
    data : {},
}

const adminReducer = ( state = adminInitialState, action ) => {
    switch ( action.type ) {
        case 'ADMIN-AUTH-ERRORS' : {
            if( action.payload.hasOwnProperty('errors')){
                return { ...state, errors : { ...action.payload } }
            }else if( action.payload.hasOwnProperty('academy.name') ){
                return { ...state, errors : { academy : { name : action.payload['academy.name'].message } } }
            }else{
                let result
                for( const key in action.payload ){
                    result = { ...result , [key] : action.payload[key].message }
                }
                return { ...state, errors : { ...result} }
            }
        }
        case 'LOGGEDIN' : {
            return { ...state, isLoggedIn : !state.isLoggedIn }
        }
        case 'ADMIN-LOADING' : {
            return { ...state, isLoading : !state.isLoading }
        }
        case 'ADMIN-ACCOUNT' : {
            return { ...state, data : { ...action.payload } }
        }
        case 'EDITED-ACCOUNT' : {
            return { ...state, data : { ...state.data, ...action.payload } }
        }
        case 'ADMIN-LOGOUT' : {
            return { ...adminInitialState }
        }
        default : {
            return { ...state }
        }
    }
}

export default adminReducer