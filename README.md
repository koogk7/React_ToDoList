# React Tutorial - To Do List Demo

### Envirment
  - react : 16.8.3
  - yarn  : 1.12.3

### Screen Shot 
<img width="426" alt="스크린샷 2019-05-29 오후 7 19 40" src="https://user-images.githubusercontent.com/48513360/58549575-cb33c500-8246-11e9-84d1-b636105ed4c7.png">

### Function
  - Add To do
  - Delete To do
  - Check To complete
  
### Structer
<img width="751" alt="스크린샷 2019-05-29 오후 7 44 20" src="https://user-images.githubusercontent.com/48513360/58551083-3cc14280-824a-11e9-9291-c92cb0c87136.png">
  
## Review

### App.js

```javascript
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

```

+ state 내부의 배열에 원소를 더할 때 **절대 push 메소드를 쓰지 않는다**. 리액트는 **setState()** 메소드가 호출 될때 **리렌더링** 되도록 구현되어 있기 때문에 렌더링이 불필요한 경우에도 일어 날 수 있다.  **shouldComponentUpdate** 와 같은 라이플 사이클 api를 통해 이런 상황을 방지한다. 이를 위해서는 이전 state와 다음 state의 비교가 일어나게 되는데, push 메소드를 사용 할 경우, 같은 배열을 리턴하기 때문에 적절한 비교가 이루어지지 않는다. 반면 concat은 기존배열에 추가하는 원소를 더한 새로운 배열을 리턴함으로 적절한 비교가 가능해진다. (전개연산자를 사용해도 괜찮다.)

  

```javascript
handleToggle = (id) => {
        const { todos } = this.state;.
        const index = todos.findIndex(todo => todo.id === id);
        const selectd = todos[index]; 
        const nextTodos = [...todos]; // 배열을 복사
  
        nextTodos[index] = {
            ...selectd,
            checked: !selectd.checked
        };

        this.setState({
            todos: nextTodos
        });
    };
```

+ javascript의 객체나 배열은 기본적으로 **shwallow copy**(주소값을 공유)를 수행한다. 때문에 **deep copy**(값을 복사하여 새로운 메모리를 할당받는다)를 수행하기 위하여 전개연산자를 통해 새로운 배열을 만들어 준다.



### TodoListTemplate.js

```javascript
const TodoListTemplate = ({form, children}) =>{
    return (
        <main className="todo-list-template">
            <div className="title">
                오늘 할 일
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="todos-wrapper">
                {children}
            </section>
        </main>
    );
};
```

+ children은 TodoListTemplate  태그 사이의 값이 들어감
+ TodoListTemplate.js 는 함수형 컴포넌트이다. 함수형 컴포넌트는 첫 마운팅 속도에 있어 7%~11% 빠르며 컴포넌트 자체 기능이 없고 props가 들어가면 뷰가 나온다는 것을 명시하기 위해 사용한다. 이때 컴포넌트는 state나 라이플 사이클 api를 전혀 사용하지 않는다. 
+ 특히 Redux를 사용하여 컴포넌트들을 구성 할 때, Container 컴포넌트는 클래스형, Presentational 컴포넌트는 함수형 컴포넌트를 사용한다.



### TodoItem.js

```javascript
class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.checked !== nextProps.checked;
    }

    render(){
        const { text, checked, id, onToggle, onRemove} = this.props;
        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id)
                }}>
                    &times;
                </div>
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
```

+ onToggle과 같이 파라미터를 넣어줘야 되는 함수는 ()=>onToggle(id)와 같이 작성한다. onToggle(id)를 넘겨줄 경우 해당 함수가 렌더링 될때마다 호출되고, 호출되면 데이터가 변경되고 다시 리렌더링되는 무한반복이 일어날 수 있다
+ 일반 **html 태그 내에 onclick은 인라인 js를 실행**시키는 것이기 때문에 ()를 붙임으로서 호출을 해주나, 리액트 같은 경우는 **addEventHandler와 같이 바인딩하기 때문에 함수 객체만 넘겨준다.**
+ 클래스 네임을 동적할당 하기 위해 **템플릿 리터럴**를 사용하였다.


## Reference
- https://velopert.com/3480

