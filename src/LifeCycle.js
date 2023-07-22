import { useEffect, useState } from "react";

//리액트 라이프 사이클 제어 해보기

const LifeCycle = () => {

    const [count, setCount] = useState(0);
    const [text, setText] = useState("");


    return <div style={{padding : 20}}>
        <div>
            {count}
            <button onClick={()=>setCount(count+1)}> + </button>
        </div>
        <div>
            <input value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

    </div>
};

export default LifeCycle