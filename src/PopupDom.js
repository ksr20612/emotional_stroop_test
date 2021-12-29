import ReactDom from "react-dom";

const PopupDom = ({children})=>{
    const elem = document.querySelector("#test_sheet");
    return ReactDom.createPortal(children, elem);
}