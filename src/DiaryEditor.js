import { useState, useRef } from "react";


const DiaryEditor = () => {
    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1
    });

    const handleChangeState = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if(state.author.length < 1) {
            // alert("최소 1글자 이상 입력해야 합니다.")
            authorInput.current.focus();
            return;
        }
        if(state.content.length < 5) {
            // alert("최소 5글자 이상 입력해야 합니다.")
            contentInput.current.focus();
            return;
        }
        
        alert("저장 되었습니다.");
    }

    return (
    <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>
            <input 
                ref={authorInput}
                value={state.author}
                onChange={handleChangeState}
                name="author"
                placeholder="작성자"
                type="text"
            />
        </div>

        <textarea
            ref={contentInput}
            value={state.content}
            onChange={handleChangeState}
            name="content"
            placeholder="일기내용"
            type="text"
        />

        <div>
            <span>오늘의 감정점수</span>
            <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
            >
                <option value={1}>1</option>    
                <option value={2}>2</option>  
                <option value={3}>3</option>  
                <option value={4}>4</option>  
                <option value={5}>5</option>  
            </select>
        </div>

        <div>
            <button onClick={handleSubmit}>저장하기</button>
        </div>
    </div>
    )
};

export default DiaryEditor;