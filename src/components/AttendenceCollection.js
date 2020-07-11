import React, {useState, useCallback} from 'react';
import axios from 'axios';

const AttendenceCollection = ({type}) => {
    const [employeeId, setEmployeeId] = useState(''); 
    const [employeeList, setEmployeeList] = useState({});
    const inputOnchange = (e) => {
        console.log(e.currentTarget.value);
        setEmployeeId(e.currentTarget.value);
    }
    const nextEmployeeButtonClick = (e) => {
        const date = new Date();
        const hours = date.getHours();
        const min = (`0${date.getMinutes()}`).slice(-2);
        setEmployeeList({...employeeList, ...{[employeeId]:`${hours}:${min}`}});
        console.log(employeeList);
    };
    const submitAttendence = () => {
        const origin = window.location.origin;
        const url = `${origin}/saveattendence`;
        axios.post(url, {"type": type, "attendence":employeeList}).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error)=>{
            alert(error);
        });
        
    };

    const employees = Object.keys(employeeList) || [];
    const getemployeeUIList = employees.map(employeeKey => <li key={`li-${employeeKey}`}>{`${employeeKey} - ${employeeList[employeeKey]}`}</li>);
    // const getemployeeUIList = () => {
    //     if(employees.length> 0 ){
    //        return  employees.map((employeeKey)=>{<li key={`${employeeKey}`}> {`${employeeKey - employeeList[employeeKey]}`}</li>
    //                 })
    //     }
    //     return <li></li>
    //     }
    return (
        <>
        <h1 className="header">{`${type} employee attendence`}</h1>
        <input placeholder="enter employee id" 
        type='tel' 
        onChange={inputOnchange}
        value={employeeId}
        className="input"
        
        /> 
        <button className="fullButton" onClick={nextEmployeeButtonClick}> next employee </button>
        {employees.length > 0 && <ul> {getemployeeUIList}</ul>}
        {employees.length > 0 && <button className="fullButton" onClick={submitAttendence}> submit attendence</button>}
        </>
    );
}

export default AttendenceCollection;