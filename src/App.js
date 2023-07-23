import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


function App() {
  const [data, setDate] = useState([]);

  const dataId = useRef(0);

  const getDate = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    
    const initData = res.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5)+1,
        created_date : new Date().getTime(),
        id: dataId.current++
      }
    })
    setDate(initData);
  }
  useEffect(() => {
    getDate();
  },[])

  // 추가 기능
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    setDate((data)=>[newItem, ...data]); // 함수형 업데이트
  },
  []); // deps 안에 값이 변경되면 함수가 재생성됨

  // 삭제 기능
  const onRemove = useCallback((targetId) => {
    setDate(data => data.filter((it) => it.id !== targetId));
  }, []);
  // 수정 기능
  const onEdit = useCallback((targetId, newContent) => {
    setDate((data) =>
      data.map((it) =>
        it.id === targetId ? {...it, content: newContent}: it)
    );
  },[]);


//useMemo는 값을 반환 하기 때문에 useCallback 을 onCreate에 적용 
//useCallback은 메모이제이션된 콜백을 반환
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    
    return {goodCount, badCount, goodRatio};
  }, [data.length]);
  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;


  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>전체일기 : {data.length}</div>
      <div>기분 좋은 일기 수 : {goodCount}</div>
      <div>기분 나쁜 일기 수 : {badCount}</div>
      <div>기분 나쁜 좋은 비율 : {goodRatio}</div>
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit}/>
    </div>
  );
}

export default App;
