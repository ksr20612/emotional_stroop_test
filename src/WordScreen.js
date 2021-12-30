import React, {useState} from "react"

const WordScreen = ({...props}) => {
    return (
        <div id="word_screen" style={{color : props.word.color}}>
            <div>{props.word.word}</div>
        </div>
    )
}

export default WordScreen;