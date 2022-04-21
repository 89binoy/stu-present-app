import { useState } from 'react';
import './App.css';


function App() {

  const [studentName, setStudentName] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);


  const addStudent = (event) => {
    event.preventDefault();

    if (studentName) {
      const newStudent = {
        id: Date.now(),
        name: studentName,
      }
      setStudentList([...studentList, newStudent]);
    } else {
      alert('Enter valid name.');
    }
    setStudentName('');
  }

  const editHandler = (id) => {
    const toBeEditedItem = studentList.find(student => student.id === id);
    setIsEditable(true);
    setEditableStudent(toBeEditedItem);
    setStudentName(toBeEditedItem.name);
  }

  const updateHandler = (event) => {
    event.preventDefault();
    editableStudent.name = studentName || editableStudent.name;
    setStudentName('');
    setIsEditable(false);
    setEditableStudent(null);
  }

  const deleteHandler = (id) => {
    const newStudentList = studentList.filter(student => student.id !== id)
    setStudentList(newStudentList);
  }

  const presentHandler = (id) => {

    const student = studentList.find(student => student.id === id);

    if (student.isPresent === undefined) {
      student.isPresent = true;
      setStudentList([...studentList]);
    } else if (student.isPresent === true) {
      alert('This student is already in present list');
    } else if (student.isPresent === false) {
      alert('This student already in absent list');
    }
  }

  const absentHandler = (id) => {
    const student = studentList.find(student => student.id === id);

    if (student.isPresent === undefined) {
      student.isPresent = false;
      setStudentList([...studentList]);

    } else if (student.isPresent === true) {
      alert('This student is already in present list');
    } else if (student.isPresent === false) {
      alert('This student already in absent list');
    }
  }

  const toogleIsPresent=(id)=>{
    const student = studentList.find(student=>student.id===id);
    student.isPresent=!student.isPresent;
    setStudentList([...studentList]);
  }

  return (
    <div className="App">

      <form>
        <input type='text' name='studentName' placeholder='Enter student name...'
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)} />

        <button onClick={(e) => isEditable === true ? updateHandler(e) : addStudent(e)}>
          {isEditable === true ? 'Update Student' : 'Add Student'}
        </button>
      </form>

      <div className='student-section'>
        <div className='all-student'>
          <h2>All Students</h2>
          <ul>
            {studentList.map(student => (
              <li>
                <span>{student.name}</span>
                <button onClick={() => editHandler(student.id)}>Edit</button>
                <button onClick={() => deleteHandler(student.id)}>Delete</button>
                <button onClick={() => presentHandler(student.id)}>Present</button>
                <button onClick={() => absentHandler(student.id)}>Absent</button>
              </li>
            ))}

          </ul>

        </div>

        <div className='present-student'>
          <h2>Present Students</h2>
          <ul>
            {studentList.filter(student => student.isPresent === true).map(item =>
            (
              <li>
                <span>{item.name}</span>
                <button onClick={()=>toogleIsPresent(item.id)}>Accidentaly Added</button>
              </li>
            ))}
          </ul>
        </div>

        <div className='absent-student'>
          <h2>Absent Students</h2>
          <ul>
            {studentList.filter(student => student.isPresent === false).map(item =>
            (
              <li>
                <span>{item.name}</span>
                <button onClick={()=>toogleIsPresent(item.id)}>Accidentaly Added</button>
              </li>
            ))}
          </ul>
        </div>

      </div>


    </div>
  );
}

export default App;
