import React from 'react';
import './TodoListTemplate.css'

/*
    함수형 컴포넌트 : state나 라이프사이클 api를 전혀 사용하지 않을 때,
    컴포넌트의 자체기능이 없고 props가 들어가면 뷰가 나온다는 것을 명시하기 위해 사용
    성능은 첫 마운팅 속도에 있어서 7%~11% 빠름
    Redux를 사용하여 컴포넌트들을 구성 할 때, Container 컴포넌트는 클래스형
    Presentational 컴포넌트는 함수형 컴포넌트를 사용
 */

/*
    템플릿 컴포넌트!
 */
const TodoListTemplate = ({form, children}) =>{
    // children 은  <TodoListTemplate>여기에 있는 내용!</TodoListTemplate> 이 들어감
    return (
        <main className="todo-list-template">
            <div className="title">
                오늘 할 일
            </div>
            {/*
                section 요소는 주제가 다른 영역을 구분짓거나 하나의 글을 부분으로 나눔
                각 영역의 세부내용들은 article 태그안에, div 태그는 글자나 사진등 콘텐츠들을
                묶어서 css 스타일을 적용시킬 때 사용
             */}
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todos-wrapper">
                {children}
            </section>
        </main>
    );
};

export default TodoListTemplate;