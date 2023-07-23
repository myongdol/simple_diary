import React, { useEffect, useState } from "react";

const CounterA = ({count}) => {
    return <div>{count}</div>
}
const CounterB = ({obj}) => {
    return <div>{obj.count}</div>
}

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
            <CounterB obj={obj}/>
            <button onClick={()=> setObj({
                count: obj.count
            })}>B Btn</button>
        </div>


    </div>
    );
}

export default OptimizeTest;