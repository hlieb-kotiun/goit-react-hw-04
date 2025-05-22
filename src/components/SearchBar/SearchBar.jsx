import { IoSearch } from "react-icons/io5";
import s from "./SearchBar.module.css";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

const SearchBar = ({ setQuery }) => {
  const initialValues = {
    query: "",
  };

  const onSubmit = (values, actions) => {
    if (values.query === "") {
      toast.error("Field must be filled!", { position: "top-right" });
      return;
    }

    setQuery(values.query);
    actions.resetForm();
  };

  return (
    <header className={s.header}>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        <Form className={s.form}>
          <Field
            className={s.input}
            type="text"
            placeholder="Search images and photos"
            name="query"
          />
          <button className={s.btn} type="submit">
            <IoSearch className={s.icon} size={20} />
          </button>
        </Form>
      </Formik>
    </header>
  );
};
export default SearchBar;
