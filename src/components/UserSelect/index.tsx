import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./UserSelect.module.css";

// [ 1 ] + users array (users: any[];) to props definition
type UserSelectProps = {
  user?: number;
  idx: number;
  users: any[];
};

function UserSelect(props: UserSelectProps) {
  const dispatch = useDispatch();
  const todos = useSelector((state: { list: { todos: any[] } }) => state.list.todos);

  // - useEffect and contained fetching as they are no longer neededd here.

  const { idx } = props;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const changedTodos = todos.map((t, index) => {
      const res = { ...t };
      if (index === idx) {
        res.user = e.target.value ? parseInt(e.target.value, 10) : undefined;
      }
      return res;
    });
    dispatch({ type: "CHANGE_TODOS", payload: changedTodos });
  };

  return (
    <select name="user" className={styles.user} onChange={handleChange} value={props.user || ""}>
      {/* <select> tag was missing the value prop (value={props.user || ""})*/}
      <option value="">Unassigned</option>
      {/* + props.users instead of local state (+ Initialize with Unassigned instead of assigning the first person on the list)*/}
      {props.users.map((user: any) => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelect;
