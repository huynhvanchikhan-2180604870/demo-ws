import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Modal, Box, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { API_BASE_URL } from '../../../../config/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PromotionsManager = () => {
  const [promotions, setPromotions] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      const response = await axios.get(`${API_BASE_URL}/api/v2/promotions`, config);
      setPromotions(response.data);
    } catch (error) {
      console.error('Failed to fetch promotions:', error);
    }
  };

  const initialValues = {
    code: '',
    description: '',
    discountType: '',
    discountValue: '',
    startDate: '',
    endDate: '',
    conditions: ''
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem('jwt');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
        console.log("data promotion: ", values)
      await axios.post(`${API_BASE_URL}/api/v2/promotions`, values, config);
      fetchPromotions();
      handleClose();
      resetForm();
    } catch (error) {
      console.error('Failed to create promotion:', error);
    }
    setSubmitting(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Manage Promotions</Typography>
      <IconButton onClick={handleOpen} color="primary" aria-label="add promotion">
        <AddCircleOutlineIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-promotion-modal"
        aria-describedby="create-promotion-modal-form"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create New Promotion
          </Typography>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Field as={TextField} name="code" label="Promotion Code" fullWidth margin="normal" />
                <Field as={TextField} name="description" label="Description" fullWidth margin="normal" />
                <Field as={TextField} name="discountType" label="Discount Type" fullWidth margin="normal" />
                <Field as={TextField} name="discountValue" type="number" label="Discount Value" fullWidth margin="normal" />
                <Field as={TextField} name="startDate" type="date" label="Start Date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                <Field as={TextField} name="endDate" type="date" label="End Date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                <Field as={TextField} name="conditions" label="Conditions" fullWidth multiline rows={4} margin="normal" />
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} style={{ marginTop: '20px' }}>
                  Create Promotion
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Discount Type</TableCell>
              <TableCell>Discount Value</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Conditions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>{promotion.code}</TableCell>
                <TableCell>{promotion.description}</TableCell>
                <TableCell>{promotion.discountType}</TableCell>
                <TableCell>{promotion.discountValue.toString()}</TableCell>
                <TableCell>{promotion.startDate}</TableCell>
                <TableCell>{promotion.endDate}</TableCell>
                <TableCell>{promotion.conditions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PromotionsManager;
