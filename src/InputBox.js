import React, {useState, useLayoutEffect, useRef} from "react"
import {motion} from "framer-motion";

const InputBox = ({handleChange=f=>f, submit=f=>f, ...props}) => {

    const textBox = useRef();
    useLayoutEffect(()=>{
        if(textBox.current !== null) {
            textBox.current.focus();
        }
    });


    return (
        <div id="answer">
            <input type="text" ref={textBox} onChange={handleChange} onKeyPress={props.pushEnter} maxLength="10"/>
            <motion.div id="btn_submit" ref={props.submitButton} whileTap={{scale : 0.93}} onClick={()=>submit()}>제출</motion.div> 
        </div>
    )
}

export default InputBox;