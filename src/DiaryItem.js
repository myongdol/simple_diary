const DiaryItem = ({author, content, created_date, emotion, id, onDelete}) => {
    return (
        <div className="DiaryItem">
            <div className="Info">
                <span>작성자 : {author} ⭐️ 감정점수: {emotion}</span>
                <br/>
                <span className="date">
                    {new Date(created_date).toLocaleString()}
                </span>
            </div>
            <div className="content">
                {content}
            </div>
            <button onClick={() => {
                console.log(id)
                if(window.confirm(`${id}번째의 일기를 정말 삭제 하시겠습니까?`)) {
                    onDelete(id);
                }
            }}>
                삭제하기
            </button>
        </div>
    );
};

export default DiaryItem;