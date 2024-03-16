import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { API } from "../Global/Global";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = { Title: "", Author: "", ISBN: "", PublicationDate: "" };

const AddBooks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(undefined);

  useEffect(() => {
    if (id === "new") {
      setBook(initialValues);
    } else {
      const fetchpost = async () => {
        const { data } = await axios.get(`${API}/${id}`);
        setBook(data);
      };
      fetchpost();
    }
  }, [id]);
  console.log(book);

  return (
    <div className="container text-center">
      <h1 className="m-3 heading">
        {id === "new" ? "Add Books...📚" : "Update Books...📚"}{" "}
      </h1>
      {book ? (
        <Formik
          initialValues={book}
          onSubmit={async (values, { resetForm }) => {
            console.log("onsubmit values", values);
            try {
              if (id === "new") {
                await axios.post(API, values);
                alert("Added Successfully...👍🏻");
                navigate("/Books");
              } else {
                await axios.put(`${API}/${id}`, values);
                alert("Updated Successfully...👍🏻");
                navigate("/Books");
              }
            } catch (error) {
              console.log(error);
            }

            resetForm();
          }}
          validationSchema={yup.object({
            Title: yup.string().required("Please Enter The Book's Title"),
            Author: yup.string().required("Please Enter The Author's Name"),
            ISBN: yup.string().required("Please Enter the ISBN Number"),
            PublicationDate: yup
              .string()
              .required("Please Enter the Publication Date"),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Title"
                name="Title"
                color="secondary"
                focused
                error={Boolean(errors.Title) && Boolean(touched.Title)}
                helperText={Boolean(touched.Title) && errors.Title}
              />
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Author"
                name="Author"
                color="secondary"
                focused
                error={Boolean(errors.Author) && Boolean(touched.Author)}
                helperText={Boolean(touched.Author) && errors.Author}
              />
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="ISBN NO"
                name="ISBN"
                color="secondary"
                focused
                error={Boolean(errors.ISBN) && Boolean(touched.ISBN)}
                helperText={Boolean(touched.ISBN) && errors.ISBN}
              />
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Publication Date"
                name="PublicationDate"
                type="date"
                color="secondary"
                focused
                error={
                  Boolean(errors.PublicationDate) &&
                  Boolean(touched.PublicationDate)
                }
                helperText={
                  Boolean(touched.PublicationDate) && errors.PublicationDate
                }
              />
              <Button
                size="large"
                variant="contained"
                color="warning"
                type="submit"
                className="w-50 my-1"
                disabled={!dirty || !isValid}
              >
                {id === "new" ? "Add Book" : "Update Book"}
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        ""
      )}
    </div>
  );
};
export default AddBooks;
