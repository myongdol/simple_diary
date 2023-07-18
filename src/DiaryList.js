const DiaryList = ({diaryList}) => {
    console.log(diaryList)
    return (
        <div className="DiaryList">
            <h2>일기 목록</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it) => (
                    <div>
                        <div>작성자 : {it.author}</div>
                        <div>내용 : {it.content}</div>
                        <div>감정 : {it.emtion}</div>
                        <div>작성 시간 : {it.created_date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiaryList;