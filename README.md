## React Tutorial - To Do List Demo

### Envirment
  react : 16.8.3
  yarn  : 1.12.3

### Screen Shot 
<img width="426" alt="스크린샷 2019-05-29 오후 7 19 40" src="https://user-images.githubusercontent.com/48513360/58549575-cb33c500-8246-11e9-84d1-b636105ed4c7.png">

### Function
  - Add To do
  - Delete To do
  - Check To complete
  
### Structer
<img width="751" alt="스크린샷 2019-05-29 오후 7 44 20" src="https://user-images.githubusercontent.com/48513360/58551083-3cc14280-824a-11e9-9291-c92cb0c87136.png">
  
### Reivew
 App.js

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
