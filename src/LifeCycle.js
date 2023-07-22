import { useEffect, useState } from "react";

//리액트 라이프 사이클 제어 해보기


const UnmountTest = () => {

    useEffect(()=> {
        console.log("mount");
        
        return () => {
            //unmount 시점에 실행됨
            console.log("unmount")
        }
    },[])

    return <div>언마운트 테스트</div>
}

const LifeCycle = () => {

    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => setIsVisible(!isVisible);

    return <div style={{padding : 20}}>
        <button onClick={toggle}> ON / OFF</button>
        {isVisible && <UnmountTest />}
    </div>
};

export default LifeCycle