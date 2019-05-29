import React from 'react';
import './Form.css';

// {value, onChange, onCreate, onKeyPress} 구조 분해 할당 구문 사용
// 객체가 들어왔을 때 해당 객체를 분해하여 각 이름에 맞게 매칭시켜줌
const Form = ({value, onChange, onCreate, onKeyPress}) => {
    return (
        <div className="form">
            <input value={value} onChange={onChange} onKeyPress={onKeyPress}/>
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
        </div>
    );
};

export default  Form;