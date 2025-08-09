import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import { API_BASE_URL } from '../../../../config/api';

const RegisterHostsList = () => {
  const [hosts, setHosts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchHosts();
  }, []);

  const fetchHosts = async () => {
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v2/admin/register-hosts`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      console.log("host data", response)
      setHosts(response.data);
    } catch (error) {
      console.error('Failed to fetch hosts:', error);
      enqueueSnackbar('Failed to load hosts.', { variant: 'error' });
    }
  };

  const handleApprove = async (id) => {
    const jwt = localStorage.getItem('jwt');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v2/admin/accept-host/${id}`, {}, {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
      enqueueSnackbar('Host approved successfully!', { variant: 'success' });
      fetchHosts(); // Reload hosts after approval
    } catch (error) {
      console.error('Failed to approve host:', error.response ? error.response.data : 'No response');
      enqueueSnackbar('Failed to approve host.', { variant: 'error' });
    }
  };
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hosts.map((host) => (
            <TableRow key={host.id}>
              <TableCell>{host.username}</TableCell>
              <TableCell>{host.email}</TableCell>
              <TableCell>{host.active}</TableCell>
              <TableCell>
                {host.active === "Pending" && (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleApprove(host.id)}
                  >
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RegisterHostsList;
