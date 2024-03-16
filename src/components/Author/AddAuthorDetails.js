import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { API } from "../Global/Global";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const initialValues = { Name: "", Email: "", DOB: "", Country: "" };

const AddAuthorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [authors, setAuthors] = useState(undefined);

  useEffect(() => {
    if (id === "new") {
      setAuthors(initialValues);
    } else {
      const fetchpost = async () => {
        const { data } = await axios.get(`${API}/${id}`);
        setAuthors(data);
      };
      fetchpost();
    }
  }, []);
  console.log(authors);

  return (
    <div className="container text-center">
      <h1 className="m-3 heading">
        {id === "new"
          ? "Add Author's Records"
          : "Update Author's Records"}
      </h1>
      {authors ? (
        <Formik
          initialValues={authors}
          onSubmit={async (values, { resetForm }) => {
            console.log("onsubmit values", values);
            try {
              if (id === "new") {
                await axios.post(API, values);
                alert("Added Successfully...👍🏻");
                navigate("/Author");
              } else {
                await axios.put(`${API}/${id}`, values);
                alert("Updated Successfully...👍🏻");
                navigate("/Author");
              }
            } catch (error) {
              console.log(error);
            }
            resetForm();
          }}
          validationSchema={yup.object({
            Name: yup.string().required("Please Enter The Author's Name"),
            Email: yup
              .string()
              .required("Please Enter The Author's Email")
              .email("Invalid Email"),
            DOB: yup
              .string()
              .required("Please Enter the Author's Date of Birth"),
            Country: yup.string().required("Please Enter the Author's Country"),
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Name"
                name="Name"
                color="secondary"
                focused
                error={Boolean(errors.Name) && Boolean(touched.Name)}
                helperText={Boolean(touched.Name) && errors.Name}
              />
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Email"
                name="Email"
                type="email"
                color="secondary"
                focused
                error={Boolean(errors.Email) && Boolean(touched.Email)}
                helperText={Boolean(touched.Email) && errors.Email}
              />
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Date of Birth"
                type="date"
                name="DOB"
                color="secondary"
                focused
                error={Boolean(errors.DOB) && Boolean(touched.DOB)}
                helperText={Boolean(touched.DOB) && errors.DOB}
              />
              <Field
                as={TextField}
                fullWidth
                className="my-2"
                label="Country"
                name="Country"
                color="secondary"
                focused
                error={Boolean(errors.Country) && Boolean(touched.Country)}
                helperText={Boolean(touched.Country) && errors.Country}
              />
              <Button
                size="large"
                variant="contained"
                color="warning"
                type="submit"
                className="w-50 my-1"
                disabled={!dirty || !isValid}
              >
                {id === "new" ? "Add Author" : "Update Author"}
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
export default AddAuthorDetails;
