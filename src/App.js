import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

//reducer는 2개의 파라미터를 받음
//state는 상태변화가 일어나기 직전, action은 어떤 상태변화를 일으켜야 하는지에 대한 정보
const reducer = (state, action) => {
  switch(action.type) {
    case 'INIT': {
      return action.date
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }
    case 'REMOVE': {
      return state.filter((item) => item.id !== action.targetId)
    }
    case 'EDIT': {
      return state.map((item) =>
      item.id === action.targetId ?
      {...item, content: action.newContent} : item);
    }
    default :
    return state;
  }
};

function App() {

  const [data, dispatch,] = useReducer(reducer, []);
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
    });
    dispatch({type:'INIT', data:initData})
  }
  useEffect(() => {
    getDate();
  },[])

  // 추가 기능
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type:'CREATE',
      data:{author, content, emotion, id:dataId.current}});
    dataId.current += 1;
  },
  []); // deps 안에 값이 변경되면 함수가 재생성됨

  // 삭제 기능
  const onRemove = useCallback((targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId
    })
  }, []);
  // 수정 기능
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({
      type: "EDIT",
      targetId,
      newContent
    })
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
