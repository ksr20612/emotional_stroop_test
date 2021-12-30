import React, {useState,useLayoutEffect,useRef} from "react";
import WordList from "./WordList.json"
import WordScreen from "./WordScreen.js";
import InputBox from "./InputBox.js";
import Progress from "./Progress.js";
import stopwatch from "./Stopwatch.js";

const TestSheet = () => {

    const [wordList, setWordList] = useState(WordList.warm_up);
    const [round, setRound] = useState(1);
    const [word, setWord] = useState("");
    const [isPractice, setPractice] = useState(true);
    const [isPopupOn, setPopupOn] = useState(false);
    const [answer, setAnswer] = useState("");
    const [correctness, setCorrectness] = useState([]); // 정답 : 1, 오답 : 0
    const [duration, setDuration] = useState([]);

    const btnSubmit = useRef();

    // 1 : practice, 2 : real
    const setType = (type) => {
        setPractice(type===1? true : false);
        setWordList(type===1? WordList.warm_up : WordList.real);
    }
    const changeRound = async () => {
        
        console.log("next");
        await storeCurrentRound(stopwatch.end());
        if(round>=wordList.length) {
            console.log("종료");
            closeRound(isPractice);
        }else {
            nextRound(round);
        }
    }
    const storeCurrentRound = (elapsed) => {
        setCorrectness((correctness)=>[...correctness, (answer.includes(word.answer)? 1 : 0)]);
        setDuration((duration)=>[...duration, elapsed]);
    }
    const nextRound = (round) => {
        setRound(round+1);
        setWord(wordList[round]);
        setAnswer("");
        stopwatch.start();
    }
    const handleChange = (e) => {
        setAnswer(e.currentTarget.value.replace(" ",""));
    }
    const init = () => {
        setRound(1);
        setType(1);
        setWordList(WordList.warm_up);
        setWord(wordList[round-1]);
        stopwatch.start();
    }
    const startReal = () => {
        const reset = 1;
        setRound(reset);
        setType(2);
        setWordList(WordList.real);
        setWord(wordList[reset-1]);
        setAnswer("");
        stopwatch.start();
    }
    const closeRound = (isPractice) => {
        console.log(isPractice);
        if(isPractice) {
            return startReal();
        }else {
            console.log("완전 종료");
        }
    }
    const pushEnter = (e) => {
        if(e.key === "Enter" && answer.length !== 0) {
            e.currentTarget.value = "";
            changeRound();
        }
    }

    useLayoutEffect(()=>{
        init();
    },[])

    return (
        <>
            <Progress rate={(round/wordList.length).toFixed(2)*100+"%"}/>
            <div id="test_sheet">
                <WordScreen word={word}/>
                <InputBox handleChange={handleChange} submit={changeRound} pushEnter={pushEnter} submitButton={btnSubmit}/>
            </div>
        </>
    )

}

export default TestSheet;
