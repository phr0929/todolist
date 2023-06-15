import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [todoList,setTodoList] = useState([])
  const refTodoItem = useRef()

  const setOneVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  setOneVh();

  useEffect(()=>{

    setOneVh();

    function onResize(){ 
        setOneVh();
    }
    
    window.addEventListener('resize',onResize);

    const handleSetInit = ()=>{
      let todoInit = []
      window.localStorage.setItem("todolist",JSON.stringify(todoInit))
      return JSON.stringify([])
    }
  
    let todo = JSON.parse(window.localStorage.getItem("todolist")||handleSetInit());
    setTodoList(todo)
    
  },[])
 

  const handleTodoAdd = (item) => {  
    let todo = JSON.parse(window.localStorage.getItem("todolist"));
    todo.push({tf:false,id:todoList.length,text:item})
    window.localStorage.setItem("todolist",JSON.stringify(todo)); 
    setTodoList(todo)
    refTodoItem.current.value = ''
  }


  const handleTodoCheck = (tf,idx) => {
     
    let todo = JSON.parse(window.localStorage.getItem("todolist"));

    if(tf){
      todo[idx].tf = false
    }else{
      todo[idx].tf = true
    } 

    window.localStorage.setItem("todolist",JSON.stringify(todo));  
    setTodoList(todo) 
  }
  
  const handleTodoDelete = (id) => {
    let todo = JSON.parse(window.localStorage.getItem("todolist")); 
    todo = todo.filter((val) => val.id !== id);
    window.localStorage.setItem("todolist",JSON.stringify(todo));
    setTodoList(todo) 
  }

 

  return (
    <div className="mainLayout">
      <div className='todoLayout'>
        <div className='todoTitle'>
          To do List
        </div>
        <div className='todoAdd'>
          <input type='text' placeholder="할 일을 입력하세요" ref={refTodoItem}/>
          <div onClick={()=>handleTodoAdd(refTodoItem.current.value)}>+</div>
        </div>
 
        <div className='listLayout'>
          {todoList.map((val,idx)=>
           <div className='todoItem' key={idx}>
            <div className='todoCheckBox' onClick={()=>handleTodoCheck(val.tf,idx)}>
              <div className='checkIcon'>
                {val.tf?'✔':''}
              </div>
              <span>{val.text}</span>
            </div>
            <div className='deleteBox' onClick={()=>handleTodoDelete(val.id)}>x</div>
          </div>
          )}
         
        </div>

      </div>
      
    </div>
  );
}

export default App;
