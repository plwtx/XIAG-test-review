import React from "react";
import { Form } from "react-bootstrap";
import { InputNewTodo } from "../InputNewTodo";
import UserSelect from "../UserSelect";
import { connect } from "react-redux";
import styles from "./MainApp.module.css";

type Todo = {
  title: string;
  user?: number;
  isDone: boolean;
};

type MainAppProps = {
  todos: Todo[];
  addTodo: (t: Todo) => void;
  changeTodo: (todos: Todo[]) => void;
};

// [ 1 ] + `users: any[];`
type MainAppState = {
  todoTitle: string;
  users: any[];
};

class Index extends React.Component<MainAppProps, MainAppState> {
  constructor(props: MainAppProps) {
    super(props);
    // [ 1 ] + `users: []` to initialize as an empty array
    this.state = { todoTitle: "", users: [] };
  }

  // [ 1 ] + API Fetch users when the MainApp loads .
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((users) => users.json())
      .then((users) => this.setState({ users }));
  }

  handleTodoTitle = (todoTitle: string) => {
    this.setState({ todoTitle });
  };

  handleSubmitTodo = (todo: any) => {
    this.props.addTodo(todo);
  };

  render() {
    const { todoTitle } = this.state;
    // [ 2 ] - SIDE EFFECT - Remove the "todo done" (window.allTodosIsDone) and mapping (this.props.todos.map) replace it with:
    const allTodosIsDone = this.props.todos.length > 0 && this.props.todos.every((t) => t.isDone);
    // This fixes the side effect described in NOTES.md file. (additionally this.props.todos.length > 0 so box is not checked while todos list is empty)

    // - removed:
    // window.allTodosIsDone = true;

    // this.props.todos.map((t) => {
    //   if (!t.isDone) {
    //     window.allTodosIsDone = false;
    //   } else {
    //     window.allTodosIsDone = true;
    //   }
    // });

    return (
      <div>
        {/* + readOnly prop to Form.Check to prevent console warning*/}
        <Form.Check readOnly type="checkbox" label="all todos is done!" checked={allTodosIsDone} />
        <hr />
        <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo} />
        {this.props.todos.map((t, idx) => (
          // Add key={idx} to prevent UID issues.
          <div className={styles.todo} key={idx}>
            {t.title}
            {/* [ 1 ]  + the fetched users (users={this.state.users}) down to the child component */}
            <UserSelect user={t.user} idx={idx} users={this.state.users} />

            <Form.Check
              style={{ marginTop: -8, marginLeft: 5 }}
              type="checkbox"
              checked={t.isDone}
              onChange={(e) => {
                const changedTodos = this.props.todos.map((t, index) => {
                  const res = { ...t };
                  if (index === idx) {
                    res.isDone = !t.isDone;
                  }
                  return res;
                });
                this.props.changeTodo(changedTodos);
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    addTodo: (todo: any) => {
      dispatch({ type: "ADD_TODO", payload: todo });
    },
    changeTodo: (todos: any) => dispatch({ type: "CHANGE_TODOS", payload: todos }),
    removeTodo: (index: number) => dispatch({ type: "REMOVE_TODOS", payload: index }),
  }),
)(Index);
