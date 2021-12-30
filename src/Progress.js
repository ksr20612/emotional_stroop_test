import React, {useState, useEffect} from "react"

const Progress = ({...props}) => {

    return (
        <div id="progress">
            <div id="current" style={{ width : props.rate }}>
                <span>{props.rate}</span>
            </div>
        </div>
    )
}

export default Progress;