import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }

    render(){
        const { text, checked, id, onToggle, onRemove} = this.props;
        return (
            /*
                onToggle과 같이 파리미터를 넣어줘야 하는 녀석은 ()=> onToggle(id)와 같이 작성해야함!
                onToggle(id) 와 같은 형식으로 전달한다면 해당함수가 랜더링 될 때마다 호출되고, 호출되면 데이터가
                변경되고, 데이터가 변경되면 또 리렌더링 되기때문에 함수가 호출되고.. 무한반복이 일어남! 주의!
                일반 html 태그 내에 onClick은 인라인 js를 실행시키는 것이기 때문에 ()를 붙임으로서 호출을 해주어야 하나
                리액트 같은경우는 addEventHandler 와 같이 바인딩이기때문에 함수객체만 넘겨준다.
             */
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id)
                }}>
                    &times;
                </div>
                {/*클래스네임 동적할당을 위해 템플릿 리터럴을 이용 */}
               <div className={`todo-text ${ checked ? ' checked' : '' }`}>
                    <div>{text}</div>
                </div>
                {
                    checked && (<div className='check-mark'>&#x2713;</div> )
                }
            </div>
        );
    }
}

export default TodoItem;