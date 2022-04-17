import { useState } from 'react';
import './App.css';

function App() {

const[studentName,setStudentName]=useState('');
const[studentList,setStudentList]=useState([]);
const[isEditable,setIsEditable]=useState(false);
const[editableStudent,setEditableStudent]=useState(null);


const addStudent=(event)=>{
  event.preventDefault();
  if(studentName){
    const newStudent={
      id: Date.now(),
      name: studentName,
    }
    setStudentList([...studentList,newStudent]);
  }else{
    alert('Enter valid name.');
  }
  setStudentName('');
}

const editHandler=(id)=>{
  const toBeEditedItem=studentList.find(student=>student.id===id);
  setIsEditable(true);
  setEditableStudent(toBeEditedItem);
setStudentList(toBeEditedItem.name);
}

const deleteHandler=(id)=>{
  const newStudentList=studentList.filter(student => student.id !== id)
  setStudentList(newStudentList);
}

  return (
    <div className="App">
      <form>
        <input type='text' name='studentName' placeholder='Enter student name...'
        value={studentName} 
        onChange={(e)=>setStudentName(e.target.value)}/>
        <button onClick={(e)=>addStudent(e)}>Add Student</button>
      </form>
      <ul>
        {studentList.map(student=>(
          <li>
            <span>{student.name}</span>
            <button onClick={()=>editHandler(student.id)}>Edit</button>
            <button onClick={()=>deleteHandler(student.id)}>Delete</button>
            <button>Present</button>
            <button>Absent</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
