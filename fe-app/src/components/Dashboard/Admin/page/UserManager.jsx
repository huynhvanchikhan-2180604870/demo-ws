import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAccounts } from "../../../../store/Admin/Action";
import { API_BASE_URL } from "../../../../config/api";

// Màu sắc trạng thái tài khoản
const statusColors = {
  LOCKED: red[500],
  UNLOCKED: green[500],
};

const UserManager = () => {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { admin } = useSelector((state) => state);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const handleLockUser = async (userId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/v2/admin/user-lock/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (err) {
      setError("Failed to lock user account.");
    }
  };

  const handleUnlockUser = async (userId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/v2/admin/user-unlock/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
    } catch (err) {
      setError("Failed to unlock user account.");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Danh sách người dùng
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Tên người dùng</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Trạng thái tài khoản</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin?.accounts?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell
                  style={{
                    backgroundColor: user.is_ban
                      ? statusColors.LOCKED
                      : statusColors.UNLOCKED,
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "10px",
                  }}
                >
                  {user.is_ban ? "Khóa" : "Mở khóa"}
                </TableCell>
                <TableCell>
                  {user.is_ban ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUnlockUser(user.id)}
                    >
                      Mở khóa tài khoản
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleLockUser(user.id)}
                    >
                      Khóa tài khoản
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={admin?.accounts?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default UserManager;
