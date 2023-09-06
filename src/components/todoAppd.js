import { useState } from "react";
import Todo from "./todo";
import "./todoapp.css"

//Un hook es una funcion que nos permite actualizar informacion de nuestro variables
//Para que cuando suceda algun evento podamos actualizar el valor o la informacion asisgnada a una variable
//useState es una funcion que nos va a regresar un arreglo de dos elementos


export default function TodoApp(){
    const[title, setTitle]  = useState('hola');
    const [todos, setTodos] = useState([]);


    function handleChange(event){
        const value = event.target.value;
        setTitle (value); //Asigna al titulo lo que se ingrese en el input
    };

    function handleSubmit(e){
        e.preventDefault();
        setTitle("");

        const newTodo = {
            id: crypto.randomUUID(),
            title : title ,
            completed: false
        }

        //Actualizar el valor de todos
        const temp = [...todos];
        temp.unshift(newTodo);//unshift agrega datos al principio del arreglo y push los agrega al final
        setTodos(temp);
    }

    function handleUpdate(id , value){
        //Copiamos los archivos en una variable
        const temp = [...todos];
        //en temp encuentra en item el campo id = al id que recibes
        const item = temp.find((item) => item.id ===id);
        // en el campo title del item graba el valor que entra
        item.title = value
        //manda los cambios a temp
        setTodos(temp);
    }

    function handleDelete(id){
        const temp = todos.filter(item => item.id === id);
        setTodos(temp);

    }
    return(
     <div className="todoContainer">
        <form className="todoCreateForm" onSubmit={handleSubmit}>
            <input onChange={handleChange} className="todoInput" value={title}/>
            
            <input 
            onClick={handleSubmit} 
            type="submit" 
            value="Create todo" 
            className="buttonCreate"
            />

        </form>

        <div className="todosContainer">
            {
                todos.map(item => (
                   <Todo ley={item.id} item={item} onUpdate={handleUpdate} onDelete={handleDelete}/>
                ))
            }
        </div>

    </div>)
}