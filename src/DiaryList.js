import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList}) => {
   
    
    return (
        <div className="DiaryList">
            <h2>일기 목록</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it) => (
                   <DiaryItem key={it.id} {...it}/>
                ))}
            </div>
        </div>
    );
};

//defaultProps는 undefined으로 전달될거 같은 props를 기본값으로 설정
DiaryList.defaultProps={
    diaryList: [],

}


export default DiaryList;