import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../config/api";

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const jwt = localStorage.getItem("jwt"); // Lấy JWT từ localStorage

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v2/admin/categories`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("cate", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Formik for handling category form
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/v2/admin/categories`,
          { name: values.name },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        setCategories([...categories, response.data]);
        setOpenModal(false); // Close the modal after adding
      } catch (error) {
        console.error("Error creating category:", error);
      }
    },
  });

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/v2/admin/category/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Open and close modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Thêm loại hình
      </Button>

      {/* Category Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên loại hình</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to Add Category */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            Thêm loại hình
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="Tên loại hình"
              variant="outlined"
              sx={{ marginBottom: 2 }}
              value={formik.values.name}
              onChange={formik.handleChange}
              name="name"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Thêm
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

// Modal Style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default CategoriesManager;
