import s from "./SearcBar.module.css";
import { TbZoom } from "react-icons/tb";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.text.value.trim() === "") {
      console.log("Write something");
      return;
    }
    console.log(form.text.value);
    onSubmit(form.text.value);
    form.reset();
  };
  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.wrapper}>
          <input
            className={s.input}
            name="text"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={s.button} type="submit">
            <TbZoom />
          </button>
        </div>
      </form>
    </header>
  );
};

export default SearchBar;
