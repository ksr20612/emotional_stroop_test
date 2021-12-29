import React, {useState,useEffect} from "react";
import WordList from "./WordList.json"
import WordScreen from "./WordScreen.js";
import InputBox from "./InputBox.js";
import Progress from "./Progress.js";

const TestSheet = () => {
    const [wordList, setWordList] = useState("");
    const [round, setRound] = useState(1);
    const [word, setWord] = useState("");
    const [isPractice, setPractice] = useState(true);
    const [isPopupOn, setPopupOn] = useState(false);
    const [answer, setAnswer] = useState("");

    // 1 : practice, 2 : real
    const setType = (type) => {
        setPractice(type===1? true : false);
        setWordList(type===1? WordList.warm_up : WordList.real);
    }
    const changeRound = () => {
        
    }
    const changeWord = () => {
        
    }   
    const handleChange = (e) => {
        setAnswer(e.currentTarget.value);
    }
    const handlePopup = () => {
        // 팝업 표시

        setPopupOn(!isPopupOn);
    }

    useEffect(()=>{
        setType(1);
    },[])

    return (
        <>
            <Progress />
            <div id="test_sheet">
                <WordScreen word={word}/>
                <InputBox handleChange={handleChange}/>
            </div>
        </>
    )

}

export default TestSheet;
