import axios from "axios";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "../Global/Global";
import { useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

const GetAuthors = () => {
  const [Author, setAuthor] = useState([]);
  const Navigate = useNavigate();
  useEffect(() => {
    axios.get(API).then((res) => setAuthor(res.data));
  }, []);

  const handleDelete = async (author) => {
    const confirm = window.confirm("Are You Sure to Delete?");
    if (confirm) {
      try {
        await axios.delete(`${API}/${author.id}`);
        setAuthor(Author.filter((b) => b.id !== author.id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="header">Author's Records...👨🏻‍🌾</h1>
      <div className="container-fluid">
        <div className="d-flex justify-content-end px-4 my-3">
          <IconButton
            aria-label="Add"
            color="success"
            size="small"
            onClick={() => Navigate("/Author/new")}
          >
            <AddBoxIcon />
            Add Author's Records
          </IconButton>
        </div>
        <table className="table table-light border-dark table-bordered table-striped text-center ">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Author's Name</th>
              <th>Author's Email</th>
              <th>Date of Birth</th>
              <th>Author's Country</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Author.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.Name}</td>
                <td>{author.Email}</td>
                <td>{author.DOB}</td>
                <td>{author.Country}</td>
                <td className="d-flex justify-content-center">
                  <IconButton
                    aria-label="edit"
                    color="secondary"
                    size="large"
                    onClick={() => Navigate(`/Author/${author.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="large"
                    onClick={() => {
                      handleDelete(author);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetAuthors;
