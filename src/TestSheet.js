import React, {useState,useLayoutEffect,useRef} from "react";
import WordList from "./WordList.json"
import WordScreen from "./WordScreen.js";
import InputBox from "./InputBox.js";
import Progress from "./Progress.js";
import stopwatch from "./Stopwatch.js";
import Popup from "./Popup.js";

const TestSheet = () => {

    const [wordList, setWordList] = useState(WordList.warm_up);
    const [round, setRound] = useState(1);
    const [word, setWord] = useState("");
    const [step, setStep] = useState(0);
    const [isPopupOn, setPopupOn] = useState(false);
    const [answer, setAnswer] = useState("");
    const [correctness, setCorrectness] = useState([]); // 정답 : 1, 오답 : 0
    const [duration, setDuration] = useState([]);

    const btnSubmit = useRef();

    const [averageDuration,setAverageDuration] = useState(0);
    const [score,setScore] = useState(0);

    // 0 : start, 1 : practice, 2 : real, 3 : 종료
    const setType = (type) => {
        setStep(type);
        setWordList(type===1? WordList.warm_up : WordList.real);
    }
    const changeRound = async () => {
        
        console.log("next");
        await storeCurrentRound(stopwatch.end());
        if(round>=wordList.length) {
            console.log("종료");
            closeRound(step===1? true : false);
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
        setCorrectness([]);
        setDuration([]);
        setWordList(WordList.warm_up);
        setWord(wordList[round-1]);
        stopwatch.start();
    }
    const startReal = () => {
        const reset = 1;
        setRound(reset);
        setType(2);
        setCorrectness([]);
        setDuration([]);
        setWordList(WordList.real);
        setWord(wordList[reset-1]);
        setAnswer("");
        stopwatch.start();
    }
    const closeRound = async (isPractice) => {
        console.log(isPractice);
        if(isPractice) {
            init();
            openPopup();
        }else {
            setPopupOn(false);
            setType(3);
            console.log("완전 종료");
        }
    }
    const pushEnter = (e) => {
        if(e.key === "Enter" && answer.length !== 0) {
            e.currentTarget.value = "";
            changeRound();
        }
    }

    const openPopup = () => {
        if(!isPopupOn) {
            setPopupOn(true);
        }
    }
    const closePopup = () => {
        if(isPopupOn) {
            setPopupOn(false);
        }
    }

    const calcScore = () => {

        const total = wordList.length;
        const currentScore = correctness.reduce((a,b)=>a*1+b*1);

        setScore((currentScore/total).toFixed(2)*100);
        setAverageDuration((duration.reduce((a,b)=>a*1+b*1)/total).toFixed(2));
    }

    useLayoutEffect(()=>{
        openPopup();
    },[])

    useLayoutEffect(()=>{
        if(round>=wordList.length) {
            calcScore();
        }
    })

    return (
        <>
            <Progress rate={(round/wordList.length).toFixed(2)*100+"%"}/>
            <div id="test_sheet">
                {(step!==3)?   
                    <>
                        <WordScreen word={word}/>
                        <InputBox handleChange={handleChange} submit={changeRound} pushEnter={pushEnter} submitButton={btnSubmit}/>
                    </>
                    :
                    <>
                        <div className="result"> 
                            <div className="result_title"><span>테스트 결과</span></div>
                            <div className="result_content">
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>라운드</th>
                                                <th>정답</th>
                                                <th>소요시간(초)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            correctness.map((v,i)=>{
                                                return (
                                                    <tr id={i+1}>
                                                        <td>{i+1}</td>
                                                        <td>{v===1? `O`:`X`}</td>
                                                        <td>{duration[i]}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>평균</td>
                                                <td>{score}%</td>
                                                <td>{averageDuration}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div>
                                    <div className="ranking">
                                        참여자 전체 평균과 본인의 등수
                                    </div>
                                    <div className="replay" onClick={()=>{init()}}><span>다시 시작하기</span></div>
                                </div>
                            </div> 
                        </div>
                    </>
                }
            </div>
            <div>{isPopupOn && <Popup handleClose={closePopup} type={step===0? "start" : step===1? "warmed_up" : "end"} warmUpLen={wordList.length} callback={step===0? init : step===1? startReal : ""} init={init} score={score} averageDuration={averageDuration}></Popup>}</div>
        </>
    )

}

export default TestSheet;
