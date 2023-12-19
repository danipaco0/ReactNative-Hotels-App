import { createContext, useContext, useReducer } from "react";

const GlobalStateContext = createContext();

const globalStateReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

const initialState = {
    user: null
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if(!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

export const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);
    return(
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

