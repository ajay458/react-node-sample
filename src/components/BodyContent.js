import React, {useState, useCallback} from 'react';
import AttendenceCollection from './AttendenceCollection';

const BodyContent = () => {
    const [showButtons, setShowButtons] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const inOutButtonClick = useCallback((e)=>{
        console.log(e.currentTarget);
        console.log(e.target);
        setSelectedOption(e.currentTarget.name);
        setShowButtons(false);
    });
    return (
        <>
        {showButtons && (
            <>
        <h1 className="header">Take attendence</h1>
        <div style={{"text-align": "center"}}> 
        <button className="button" name="in" onClick={inOutButtonClick}>IN</button>
        <button className="button" name="out" onClick={inOutButtonClick}>OUT</button>
        </div>
        </>)}
        {!showButtons && (
            <AttendenceCollection type={selectedOption} />
        )}
        </>
    );
};

export default BodyContent;