import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setDate] = useState([]);

  const dataId = useRef(0);

  const getDate = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());
    console.log(res);
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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit}/>
    </div>
  );
}

export default App;
