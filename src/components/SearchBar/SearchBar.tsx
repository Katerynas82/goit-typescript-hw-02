import { Formik, Form, Field, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import style from "../SearchBar/SearchBar.module.css";

type SearchBarProps = {
    setQuery: (query: string) => void;
    onSubmit: (query: string) => void;
};

type FormValues = {
    query: string;
};

const SearchBar: React.FC<SearchBarProps>=({ setQuery, onSubmit }) => {
  const initialValues: FormValues={ query: "" };

  const handleSubmit = (values: FormValues, 
    { resetForm }: FormikHelpers<FormValues>) => {
    if (!values.query || values.query.trim() === "") {
      toast.error("Please enter a search term!");
      return;
    }

    setQuery(values.query);
    onSubmit(values.query);
    resetForm();
  };

  return (
    <>
      <header className={style.header}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <Field
              className={style.input}
              name="query"
              placeholder="Search images and photos"
            />
            <button className={style.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </header>
      <ErrorMessage />
    </>
  );
};

export default SearchBar;
