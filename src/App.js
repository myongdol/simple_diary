import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "Myongdol",
    content: "hello",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "DolMyong",
    content: "world",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "Myongdoldol",
    content: "hihihihi",
    emotion: 1,
    created_date: new Date().getTime(),
  },
]


function App() {
  return (
    <div className="App">
      <DiaryEditor/>
      <DiaryList diaryList={undefined}/>
    </div>
  );
}

export default App;
