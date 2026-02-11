import React from "react";
import styles from "./InputNewTodo.module.css";

type InputNewTodoProps = {
  todoTitle: string;
  onChange: (todoTitle: string) => void;
  onSubmit: (todo: any) => void;
};

// [ 3 ] -  the state type definition removed.
export class InputNewTodo extends React.Component<InputNewTodoProps> {
  // - componentDidUpdate removed.

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  handleKeyDown = (event: React.KeyboardEvent) => {
    // event.key instead of keyCode. (keyCode is deprecated.)
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    // instead of 'this.state.value' use 'this.props.todoTitle'
    const val = this.props.todoTitle.trim();

    if (val) {
      this.props.onSubmit({
        title: val,
        isDone: false,
      });
      this.props.onChange("");
    }
  };

  render() {
    return (
      <input
        className={styles["new-todo"]}
        type="text"
        value={this.props.todoTitle}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder="What needs to be done?"
      />
    );
  }
}
