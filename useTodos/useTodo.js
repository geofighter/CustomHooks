import {useReducer, useEffect} from "react"
import {todoReducer} from "../08-useReducer/todoReducer";

export const useTodo = () => {

    const initialState = [];

    const init = () => {
        return JSON.parse( localStorage.getItem('todos')) || [];
    }

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify( todos ));
    },[todos])

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    const countTotalTodos = (todos) => {
        return todos.length
    }

    const countTodosPending = (todos) => {
        let counterTodo = 0;
        todos.map(function (todo){
            if (todo.done == true){
                counterTodo += 1;
            }
        });
        return counterTodo;
    }


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        countTotalTodos,
        countTodosPending
    }

}