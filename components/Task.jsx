import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

const FORMAT = "dd/mm/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }
const AddTask=({onCancel,onAddTask})=>{
    const[task,settask]=useState("");
    const [date,setdate]=useState(null);
    return(
        <div className="add-task-dialouge">
        <input value={task} onChange={(event)=>settask(event.target.value)}/>
        <div className="add-task-actions-container">
            <div className="btns-container">
                <button 
                    disabled={!task}
                    className="add-btn" 
                    onClick={()=>{
                        onAddTask(task,date); 
                        onCancel();
                        settask("");}
                    }>
                    Add Task
                </button>
                <button 
                    className="cancel-btn" 
                    onClick={() => {
                        onCancel(); 
                        settask("");}
                    }>
                    Cancel
                </button>
            </div>
            <div className="icon-container">
               <DayPickerInput 
                    onDayChange={(day)=>setdate(day)} 
                    placeholder={`${dateFnsFormat(new Date(),FORMAT)}`}
                    formatDate={formatDate}
                    format={FORMAT}
                    dayPickerProps={{
                        modifiers:{
                            disabled:[ {before: new Date()}],
                        },
                    }}
                /> 
            </div>
        </div>
    </div>
    );
};
const Task_Header_Mapping={
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7:"Next 7 days",
};
const TaskItems=(selectedtab,task)=>{
    let taskToRender=[...task];
    if(selectedtab==='Next_7'){
        taskToRender=taskToRender.filter(
            (task)=>
                isAfter(task.date,new Date() && 
                isBefore(task.date,addDays(new Date(),7)))
            );
    }
    if(selectedtab==='TODAY'){
        taskToRender=taskToRender.filter(
                (task)=>
                    isToday(task.date)
                );                                   
    }
    return (
        <div className="task-item-container">
            {taskToRender.map(
                    (task)=>(
                        <div className="task-item">
                            <p>{task.text} </p>
                            <p>{dateFnsFormat(new Date(task.date),FORMAT)} </p>
                        </div>
                    )
                )
            }
        </div>
    )
};
const Task = ({selectedtab}) => {
    const[showAddTask,setshowAddTask]=useState(false);
    const[task,settask]=useState([]);
    const addNewTask=(text,date)=>{
        const newTaskItem={text,date:date||new Date()};
        settask(prevState => [...prevState,newTaskItem]);
    }
    return (
        <div className="tasks">
           <h1>{Task_Header_Mapping[selectedtab]}</h1>
           {selectedtab==='INBOX'? <div 
                            className="add-task-btn"
                            onClick={()=>setshowAddTask((prevState)=>!prevState)}
                            >
                            <span className="plus">+</span>
                            <span className="add-task-text">Add Task</span>
                        </div> : null}
           {showAddTask && <AddTask onAddTask={addNewTask} onCancel={()=>setshowAddTask(false)}/> } 
            {task.length>0 ? <TaskItems tasks={task} selectedtab={selectedtab}/> : <p>No tasks yet</p>}        
        </div>
    );
}

export default Task
