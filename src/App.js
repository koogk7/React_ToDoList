import React, { Component } from 'react';
import TodoListTemplate from "./components/TodoListTemplate";
import Form from "./components/Form";
import TodoItemList from "./components/TodoItemList";

class App extends Component {
    id = 3;

    state = {
        input : '',
        todos: [
            { id: 0, text: '리액트 소개', checked: false},
            { id: 1, text: '리액트 소개', checked: true},
            { id: 2, text: '리액트 소개', checked: false}
        ]
    };

    // 애네는 컴포넌트 안에 선언하면 되지 왜 여기서 정의해?
    handleChange = (e) => {
        this.setState({
            input: e.target.value
        });
    };

    // push를 쓰지 않고 concat을 사용
    // push를 사용하면 값은 추가되지만 가르키고 있는 배열이 똑같기때문에 비교를 할 수 없다.
    // 최적화를 하게 될 때, 배열을 비교하여 리렌더링을 방지하는데 이때 push를 쓰면 할 수 없게 된다.
    // 반면 concat은 새로운 배열을 리턴하기때문에 쉽게 비교가 가능하다.
    handleCreate = () => {
        const { input, todos } = this.state;
        this.setState({
            input: '',
            todos: todos.concat({
                id: this.id++,
                text: input,
                checked: false
            })
        });
    };

    handleKeyPress = (e) => {
        if(e.key === "Enter"){ // 왜 ===?
            this.handleCreate();
        }
    };

    handleToggle = (id) => {
        const { todos } = this.state;
        // id가 가지고 있는 index를 찾습니다.
        const index = todos.findIndex(todo => todo.id === id);
        const selectd = todos[index]; // 해당하는 객체 리턴

        // js는 객체나 배열은 기본적으로 shwallow copy를 수행한다.
        // 때문에 deep copy를 위해 Spread syntax를 사용하여 새로운 배열을 만든다.
        const nextTodos = [...todos]; // 배열을 복사

        nextTodos[index] = {
            ...selectd,
            checked: !selectd.checked
        };

        this.setState({
            todos: nextTodos
        });
    };

    handleRemove = (id) => {
        const { todos } = this.state;
        this.setState({
            todos: todos.filter(todo => todo.id !== id)
        });
    };



    render() {
        const { input, todos } = this.state;
        const {
            handleChange,
            handleCreate,
            handleKeyPress,
            handleToggle,
            handleRemove
        } = this;
        return (
            <TodoListTemplate form={<Form
                value={input}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                onCreate={handleCreate}
            />}>
                <TodoItemList
                    todos={todos}
                    onToggle={handleToggle}
                    onRemove={handleRemove}
                />
            </TodoListTemplate>
        );
    }
}

export default App;
