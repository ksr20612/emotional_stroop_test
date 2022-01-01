import React, {useState,useLayoutEffect} from "react";
import {createPortal} from "react-dom";

const Popup = ({...props}) => {
    
    const handleStart = () => {
        props.handleClose();
        if(props.callback){
            props.callback();
        }
    }
    const replay = () => {
        props.handleClose();
        if(props.init) {
            props.init();
        }
    }

    let $popup;
    switch(props.type){
    case "start":
        $popup = (
            <div className="popup start">
                <div className="content">
                    <div>지금부터 <bold>Stroop Test</bold>를 시작하겠습니다.</div>
                    <div>화면에 나오는 낱말의 <bold>색</bold>을 가능한 빨리 키보드로 입력해주시면 됩니다.</div>
                    <div><bold>{props.warmUpLen}회의 연습</bold> 후, 본 테스트를 진행하도록 하겠습니다.</div>
                    <div>
                        여러분의 타이핑 속도에 가중치를 두어 총 점수가 계산됩니다. <br></br>
                        따라서 타자 속도에 대해서는 걱정하지 않으셔도 됩니다.
                    </div>
                    <div className="btn_start" onClick={handleStart}><span>시작하기</span></div>
                </div>
            </div>
        );
        break;
    case "warmed_up":
        console.log(props.score);
        console.log(props.averageDuration);
        $popup = (
            <div className="popup warmed_up">
                <div className="content">
                    <div>연습이 종료되었습니다.</div>
                    <div>
                        평균 소요시간은 <bold>{props.averageDuration}초</bold>입니다. <br></br>
                        정답률은 <bold>{props.score}%</bold>입니다.
                    </div>
                    <div>지금처럼 색을 입력해주신 후, <bold>엔터버튼</bold>을 눌러주시면 됩니다.</div>
                    <div className="btn_list">
                        <div onClick={replay}><span>다시 연습하기</span></div>
                        <div onClick={handleStart}><span>시작하기</span></div>
                    </div>
                </div>
            </div>
        );
        break;
    case "end":
        $popup = (
            <div className="popup start">
                <div className="content">
                </div>
            </div>
        );
        break;
    case "error":
        $popup = (
            <div className="popup start">
                <div className="content">
                </div>
            </div>
        );
        break;
    default:
        $popup = (
            <div className="popup start">
                <div className="content">
                </div>
            </div>
        );
        break;
    }

    return createPortal(
        $popup, document.querySelector("#modal")
    )

}

export default Popup;