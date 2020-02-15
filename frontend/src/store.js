import React, {createContext, useReducer, useEffect} from 'react';

const initialState = {}
const localState = JSON.parse(localStorage.getItem("stateStore"));

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'logout user':
        localStorage.removeItem("stateStore")
        return initialState
      case 'login user':
        const newState = {
          ...state,
          user: action.details
        }
        return newState
      default:
        throw new Error();
    };
  }, localState || initialState);

  useEffect(() => {
    localStorage.setItem("stateStore", JSON.stringify(state));
  }, [state]);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }