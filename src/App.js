import { useDispatch, useSelector } from "react-redux";
import { fetchAllTodos, TodosAction } from "./store";
import { useEffect } from "react";

import "./styles.css";

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosStore.todos);
  const todosPerPage = useSelector((state) => state.todosStore.todosPerPage);
  const currentPage = useSelector((state) => state.todosStore.currentPage);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [dispatch]);

  const totalPages = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * todosPerPage;
  const indexofFirstPage = indexOfLastPage - todosPerPage;

  const visibleTodos = todos.slice(indexofFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== 1) {
      dispatch(TodosAction.onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== totalPages) {
      dispatch(TodosAction.onNavigateNext());
    }
  };

  const handleCurrentPage = (_p) => {
    dispatch(TodosAction.onClickCurrentPage(_p));
  };

  return (
    <div>
      <p>
        <span className="button" onClick={navigatePrev}>
          Prev
        </span>
        {pages.map((_p) => (
          <span
            className="button"
            key={_p}
            onClick={() => handleCurrentPage.call(null, _p)}
          >
            {_p}
          </span>
        ))}
        <span className="button" onClick={navigateNext}>
          Next
        </span>
      </p>

      <ul>
        {visibleTodos.map((_todo) => (
          <li key={_todo.id}>
            {_todo.id} - {_todo.title}
          </li>
        ))}
      </ul>
      <hr />
      <footer>
        Page {currentPage} of {totalPages}
      </footer>
      <hr />
      <select
        onChange={(event) => {
          dispatch(TodosAction.onChangeTodosPerpage(event.target.value));
        }}
      >
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
