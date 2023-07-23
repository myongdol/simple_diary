import React, { useEffect, useState } from "react";

const CounterA = React.memo(({count}) => {
    useEffect(() => {
        console.log(`Counter A Update - count: ${count}`);
    })
    return <div>{count}</div>
});

const CounterB = React.memo(({obj}) => {
    useEffect(() => {
        console.log(`Counter B Update - counter: ${obj.count}`)
    })
    return <div>{obj.count}</div>
});


//return 값이 true 일 경우, 이전 프롭스 와 현재 프롭스가 같다. -> 리렌더링을 일으키지 않게 됨
//return 값이 false 일 경우, 이전과 현재가 다를 경우 -> 리렌더링을 일으킴
const areEqual = (prevProps, nextProps) => {
    if(prevProps.obj.count === nextProps.obj.count) {
        return true;
    }
    return false;
}

const MemoizedCounterB = React.memo(CounterB, areEqual);




const OptimizeTest = () => {
  
    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count: 1
    })


    return (
    <div style={{padding: 50}}>
        <div>
            <h2> Counter A</h2>
            <CounterA count={count}/>
            <button onClick={()=> setCount(count)}>A Btn</button>
        </div>
          <div>
            <h2> Counter B</h2>
            <MemoizedCounterB obj={obj}/>
            <button onClick={()=> setObj({
                count: obj.count
            })}>B Btn</button>
        </div>


    </div>
    );
}

export default OptimizeTest;