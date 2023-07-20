import { useRef, useState } from "react";


const DiaryItem = ({author, content, created_date, emotion, id, onRemove, onEdit}) => {
    // 삭제기능
    const handleRemove = () => {
        if(window.confirm(`${id}번째의 일기를 정말 삭제 하시겠습니까?`)) {
            onRemove(id);
        }
    }
    // 수정기능
    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);
    const [localContent, setLocalContent] = useState("");

    // 수정취소 기능
    const handleCancel = () =>  {
        setIsEdit(false);
        setLocalContent(content);
    }

    // 수정 완료 기능
    const localContentInput = useRef();

    const handleEdit = () => {

        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번째 일기를 수정 하시겠습니까?`)){
            onEdit(id, localContent);
            toggleIsEdit();
        }
    }

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
                {isEdit ? (
                    <>
                        <textarea
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)} 
                    />
                    </> ) 
                    :( 
                    <>
                     {content}
                    </>
                )}
            </div>

            {isEdit ? (
                <>
                    <button onClick={handleCancel}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )
            }
        </div>
    );
};

export default DiaryItem;