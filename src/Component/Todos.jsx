import React,{useEffect, useState} from 'react';
import './Todos.css';
import {AiOutlineDelete} from 'react-icons/ai'
import { BsCheckLg } from "react-icons/bs";
const Todos = () => {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);



  const handleSubmit = () => {

    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yr = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let submitedOn = dd + '-' + mm + '-' + yr + ' ' + 'at' + ' ' + `${h>12?h-12:h}` + ':' + m + ':' + s +' '+`${h>12?"PM":"AM"}`;



    let newTodoItem = {
      title: newTitle,
      description: newDescription,
      date:submitedOn
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    
    //storing here data and for access purpose we are stringifying them

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))

    setNewTitle(""),
     setNewDescription("")
}

  //fetching data from local storage
  useEffect(() => {

    //for all todos
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  if (savedTodo) {
      setTodos(savedTodo)
    }

    //for completed todos
     let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodo'));
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos)
    }
  },[])
  
  //for all delete todo
  const handleDelete = (index) => {
    const reduceData = [...allTodos];
    reduceData.splice(index,1)
    localStorage.setItem("todolist", JSON.stringify(reduceData))
    setTodos(reduceData)
  }
  
  //for complete delete todo
  const handleDeleteCompleteTodo = (index) => {
    const reduceData = [...completedTodos];
    reduceData.splice(index,1)
    localStorage.setItem("completedTodo", JSON.stringify(reduceData))
    setCompletedTodos(reduceData)
  }
  

  //completed todos
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yr = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yr + ' ' + 'at' + ' ' + `${h>12?h-12:h}` + ':' + m + ':' + s +' '+`${h>12?"PM":"AM"}`;
    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem)
    setCompletedTodos(updatedCompletedArr)
    handleDelete(index)
     localStorage.setItem("completedTodo", JSON.stringify(updatedCompletedArr))
}

  
  return (
    <div className='m_container'>

      <h1 className='heading-one'>My Todos</h1>
      <h5 className='heading-one'>--ntcoder--</h5>
<div className="todo-wrapper">
  <div className="todo-input">

    <div className='todo-input-item'>
      <label htmlFor="">Title</label>
      <input type="text" placeholder='Todo Title' value={newTitle} onChange={(e)=>setNewTitle(e.target.value) }  />
    </div>

    <div className='todo-input-item'>
      <label htmlFor="">Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value) } placeholder='Todo Description'  />
    </div>

    <div className='todo-input-item'>
     <button type='button' onClick={handleSubmit} className='primaryBtn'>Add</button>
    </div>

  </div>

        { /* for todo and complete btn highlighter */}
  <div className="btn-area">
    <button className={`secondaryBtn ${isCompleteScreen ===false && 'active'}`} onClick={()=>{setIsCompleteScreen(false)}}>Todo</button>
    <button className={`secondaryBtn ${isCompleteScreen ===true && 'active'}`} onClick={()=>{setIsCompleteScreen(true)}}>Completed</button>
  </div>

        <div className="totdo-list">
          {/*All todos rendering */}
          {isCompleteScreen === false && allTodos.map((item, index) => {
            return (
    
    <div className='todo-list-item' key={index}>
      <h3>
              {item.title}
                  <p>{item.description}</p>
                   <p style={{color:'pink'}}><small> {item.date}</small></p>
      </h3>
           
          <div className='icons'>
                  <AiOutlineDelete className='icon' onClick={() =>handleDelete(index)} />
            <BsCheckLg  className='check-icon' onClick={() =>handleComplete(index)}  />
            </div>
            
    </div>
  )
})}
    
           {/*completed todos rendering */}
                   {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
    
    <div className='todo-list-item' key={index}>
      <h3>
              {item.title}
                  <p>{item.description}</p>
                  <p style={{color:'pink'}}>Completetd on :<small> {item.completedOn}</small></p>
      </h3>
           
          <div className='icons'>
                  <AiOutlineDelete className='icon' onClick={() =>handleDeleteCompleteTodo(index)} />
            
            </div>
            
    </div>
  )
})}
  </div>

</div>
      
</div>
  )
}

export default Todos