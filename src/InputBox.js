import React, {useState} from "react"

const InputBox = ({handleChange=f=>f}) => {
    return (
        <div id="answer">
            <input type="text" onChange={handleChange} maxLength="10"/>
            <div id="btn_submit"></div> 
        </div>
    )
}

export default InputBox;