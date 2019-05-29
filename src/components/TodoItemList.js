import React, {Component} from 'react';
import TodoItem from "./TodoItem";

/*
    '리스트'를 렌더링하게 될 때는, 특히 보여주는 리스트가 동적인 경우에는 함수형이 아닌 클래스형
    컴포넌트로 작성! 그래야 컴포넌트 성능 최적화를 할 수 있음
 */

class TodoItemList extends Component{

    // 근데 setState를 호출하는 컴포넌트는 Form 컴포넌트인데 TodoItemList는 왜 리렌더링?
    // 리액트는 setState 함수가 호출되면 컴포넌트가 리렌더링 되도록 설계되어 있다.
    // 이때문에 불필요한 렌더링이 일어나게 되고 이는 아래함수로 최적화 가능하다.
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const { todos, onToggle, onRemove } = this.props;

        const todoList = todos.map(
            ({id, text, checked}) => (
                <TodoItem
                    id= {id}
                    text = {text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id} // 배열을 렌더링 할 때에는 반드시 key 값이 있어야한다. 그래야만 컴포넌트가 리렌더링 될 때 효율적으로 작동 할 수 있다
                    // key값이 없을 경우 map의 두번째 파라미터 index를 사용, 그러나 이는 권장하지 않음
                />
            )
        );

        return (
            <div>
                {todoList}
            </div>
        );
    }
}

export default TodoItemList;