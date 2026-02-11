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
type MainAppState = {
  todoTitle: string;
};

class Index extends React.Component<MainAppProps, MainAppState> {
  constructor(props: MainAppProps) {
    super(props);
    this.state = { todoTitle: "" };
  }
  handleTodoTitle = (todoTitle: string) => {
    this.setState({ todoTitle });
  };

  handleSubmitTodo = (todo: any) => {
    this.props.addTodo(todo);
  };

  render() {
    const { todoTitle } = this.state;
    // Remove the "todo done" (window.allTodosIsDone) and mapping (this.props.todos.map) replace it with:
    //  (window.allTodosIsDone = this.props.todos.every((t) => t.isDone);)
    window.allTodosIsDone = true;

    this.props.todos.map((t) => {
      if (!t.isDone) {
        window.allTodosIsDone = false;
      } else {
        window.allTodosIsDone = true;
      }
    });

    return (
      <div>
        {/* Add readOnly prop to Form.Check to prevent console warning*/}
        <Form.Check readOnly type="checkbox" label="all todos is done!" checked={window.allTodosIsDone} />
        <hr />
        <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo} />
        {this.props.todos.map((t, idx) => (
          // Add key={idx} to prevent UID issues.
          <div className={styles.todo} key={idx}>
            {t.title}
            <UserSelect user={t.user} idx={idx} />
            <Form.Check
              style={{ marginTop: -8, marginLeft: 5 }}
              type="checkbox"
              checked={t.isDone}
              onChange={(e) => {
                const changedTodos = this.props.todos.map((t, index) => {
                  const res = { ...t };
                  if (index == idx) {
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
