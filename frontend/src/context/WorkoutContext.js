/*
This code serves the purpose of managing workout-related data within a React application using context and a reducer pattern.

- createContext: This function creates a context object, which is used to share state between components without having to pass props through every level of the component tree.

- useReducer: This hook is used to manage complex state logic in React applications. It accepts a reducer function and an initial state, and returns the current state and a dispatch function to dispatch actions to update the state.

- WorkoutContext: This context object is created to provide a central place for storing and accessing workout-related data throughout the application.

- workoutReducer: This function is a reducer, which specifies how the state should change in response to dispatched actions. It takes the current state and an action, and returns a new state based on the action type.

- 'SET_WORKOUTS' action: This action type is used to update the workouts data in the state with a new set of workouts.

- 'CREATE_WORKOUT' action: This action type is used to add a new workout to the list of workouts in the state.

- WorkoutContextProvider: This component is a provider for the WorkoutContext. It uses the useReducer hook to manage state with the workoutReducer function, providing the state and dispatch functions to the context.

Overall, this code enables the management of workout data in a React application by providing a central context and reducer pattern to handle state changes efficiently.
*/
import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext();

export const workoutReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return{
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) =>  {
    const [state, dispatch] = useReducer(workoutReducer, {
        workouts: null
    })

    return(
        <WorkoutsContext.Provider value = {{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}