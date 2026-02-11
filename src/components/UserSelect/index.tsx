import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserSelect.module.css";

type UserSelectProps = {
  user?: number;
  idx: number;
};

function UserSelect(props: UserSelectProps) {
  const dispatch = useDispatch();
  const todos = useSelector((state: { list: { todos: any[] } }) => state.list.todos);
  React.useEffect(() => {
    // Remove unnecessary userSelect log.
    // console.log("userSelect");
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then((users) => users.json())
      .then((users) => setOptions(users));
  }, []);
  const [options, setOptions] = React.useState([]);

  const { idx } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const changedTodos = todos.map((t, index) => {
      const res = { ...t };
      if (index == idx) {
        console.log("props.user", props.user);
        res.user = e.target.value;
      }
      return res;
    });
    // TYPO: CHANGE_TODO is singular but store/index.ts listens for CHANGE_TODOS (This will prevent the user assignment from being saved.)
    dispatch({ type: "CHANGE_TODOS", payload: changedTodos });
  };

  return (
    <select name="user" className={styles.user} onChange={handleChange}>
      {/* <select> tag is missing the value prop (value={props.user || ""})*/}
      {options.map((user: any) => (
        // Add key={user.id} to prevent UID issues
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelect;
