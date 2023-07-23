import { useEffect, useMemo, useRef, useState } from 'react';
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
    setDate(initData)
  }
  useEffect(() => {
    getDate();
  },[])

  // 추가 기능
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    setDate([newItem, ...data])
  };
  // 삭제 기능
  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제 되었습니다`);
    const newDiaryList = data.filter((it) => it.id !== targetId)
    console.log(newDiaryList)
    setDate(newDiaryList);
  }
  // 수정 기능
  const onEdit = (targetId, newContent) => {
    setDate(
      data.map((it) => it.id === targetId ? {...it, content: newContent}: it)
    );
  }

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
