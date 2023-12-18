import React, { useState, useEffect } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {nanoid} from 'nanoid';
import AddStudent from './Components/AddStudent';
import _ from 'lodash';
import Student from './Components/Student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';


function App() {
 
  const [allStudents, setAllStudents] = useState (null);
  const[searchResults, setSearchResults] = useState(null);
  const[keywords, setKeywords] = useState('');
  const[gradYear, setGradYear] = useState('');


  useEffect(() => {
    if(localStorage){
      const studentsLocalStorage = JSON.parse(localStorage.getItem('students'));

      if(studentsLocalStorage){
        saveStudents(studentsLocalStorage);
      }
      else{
        saveStudents(students)
      }
    }
  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if(localStorage){
      localStorage.setItem('students', JSON.stringify(students));
      console.log('saved to local storage');
    }
  }

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  }

  const searchStudents = () => {
    let keywordsArray = [];

    if(keywords){
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if(gradYear){
      keywordsArray.push(gradYear.toString());
    }

    if(keywordsArray.length > 0){
      const searchResults = allStudents.filter(student => {
        for(const word of keywordsArray){
          if(student.firstName.toLowerCase().includes(word) || 
          student.lastName.toLowerCase().includes(word) || 
          student.gradYear === parseInt(word)){
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    }else {
      setSearchResults(allStudents);
    }
  }

  const removeStudent = (studentToDelete) => {
    console.table(studentToDelete);
    const updatedStudentsArray = allStudents.filter(student => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  }

  const updateStudent = (updatedStudent) => {
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student, ...updatedStudent} : student);
    saveStudents(updatedStudentsArray);
  }


  const students = [{
    id:nanoid(),
    firstName: "The Amazing World of Gumball",
    lastName: "Cartoon Network",
    email: "6 seasons",
    image: '/images/cartoon1.jpg',
    gradYear: 2011
  }, {
    id:nanoid(),
    firstName: "Uncle Grandpa",
    lastName: "Cartoon network",
    email: "5 seasons",
    image: '/images/cartoon2.webp',
    gradYear: 2010
  }, {
    id:nanoid(),
    firstName: "Jocko",
    lastName: "Brownhill",
    email: "jbrownhill2@twitpic.com",
    image: '/images/student3.jpg',
    gradYear: 2001
  }, {
    id:nanoid(),
    firstName: "Leicester",
    lastName: "Nys",
    email: "lnys3@blogtalkradio.com",
    image: '/images/student4.jpg',
    gradYear: 2001
  }, {
    id:nanoid(),
    firstName: "Norry",
    lastName: "Harp",
    email: "nharp4@microsoft.com",
    image: '/images/student5.jpg',
    gradYear: 2002
  }, {
    id:nanoid(),
    firstName: "Godfrey",
    lastName: "Hardi",
    email: "ghardi5@edublogs.org",
    image: '/images/student6.jpg',
    gradYear: 2002
  }, {
    id:nanoid(),
    firstName: "Dacia",
    lastName: "Crosfeld",
    email: "dcrosfeld6@businessweek.com",
    image: '/images/student7.jpg',
    gradYear: 2003
  }, {
    id:nanoid(),
    firstName: "Hollyanne",
    lastName: "Dring",
    email: "hdring7@acquirethisname.com",
    image: '/images/student8.jpg',
    gradYear: 2003
  }, {
    id:nanoid(),
    firstName: "Dorelia",
    lastName: "Sibley",
    email: "dsibley8@blinklist.com",
    image: '/images/student9.jpg',
    gradYear: 2004
  }, {
    id:nanoid(),
    firstName: "Missie",
    lastName: "Thaine",
    email: "mthaine9@umich.edu",
    //image: //'/images/student10.jpg',
    gradYear: 2004
  }];


  return ( 

   <div className='container'>
    <div className='row' id="allStudents">
      <h2 className='text-center mb-4'>Current Shows</h2>
      {searchResults && searchResults.map((student) => 
      (
        <div className='col-md-2' key={student.id} id="cards">
          <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent}/>
        </div>
      )
      )}

     
    </div>
    {/* {!allStudents && <button type="button" className='btn btn-lg btn-success' onClick={() => saveStudents(students)}>Save Students</button>} */}
    <AddStudent addStudent={addStudent} />
    <div className='row mt-4' id="searchStudents">
      <h3>Search Cartoons</h3>
        <div className='search col-md-4'>
          <label htmlFor='txtKeywords'>Search by Title, Company, or Year</label>
          <input type='text' className='form-control' placeholder='Search' onChange={evt => setKeywords(evt.currentTarget.value)} value={keywords} />
        </div>
        <div className='search col-md-4'>
          <select value={gradYear} onChange={evt => setGradYear(evt.currentTarget.value)} className='form-select'>
            <option value=''>Select Year</option>
            {_(allStudents).map(student => student.gradYear).sort().uniq().map(year => <option key={year} value={year} id="searchYears">{year}</option>).value()} 
          </select>
        </div>
        <div className='search col-md-4'>
          <button type='button' className='btn btn-info' id="searchBtn" onClick={searchStudents}>Search Cartoons <FontAwesomeIcon icon={faSearch} className='bg-transparent'/></button>
        </div>
    </div>
   </div>
  );
}

export default App;
