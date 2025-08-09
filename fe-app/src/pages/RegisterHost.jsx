import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid,
} from '@mui/material';
import '../shared/register-host.css'
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { enqueueSnackbar } from 'notistack';

const RegisterHost = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            cin: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Tên công ty là bắt buộc'),
            cin: Yup.string().required('Mã số thuế là bắt buộc'),
            email: Yup.string()
                .email('Email không hợp lệ')
                .required('Email là bắt buộc'),
            password: Yup.string()
                .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
                .required('Mật khẩu là bắt buộc'),
            address: Yup.string().required('Địa chỉ là bắt buộc'),
            phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register-host`, values);
                const data = response.data;
                if(data.status){
                    enqueueSnackbar(`${data.message}`, {
                        variant: "success",
                    });
                    resetForm(); // Reset form khi gửi thành công
                } else {
                    enqueueSnackbar(`${data.message}`, {
                        variant: "error",
                    });
                }
            } catch (error) {
                enqueueSnackbar('Đã xảy ra lỗi khi gửi dữ liệu. Vui lòng thử lại.', {
                    variant: "error",
                });
            }
        },
        
    });

    useEffect(() =>{

    }, [])

    return (
        <div className="register__host">
            <Typography variant="h5" gutterBottom className='text-center'>
                    Đăng ký làm nhà cung cấp tour
            </Typography>

            <Box
                sx={{
                    maxWidth: 600,
                    margin: 'auto',
                    padding: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                autoComplete="disable" // Giá trị thay thế
                                id="username"
                                name="username"
                                label="Tên công ty"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                autoComplete="disable"
                                id="cin"
                                name="cin"
                                label="Mã số thuế "
                                value={formik.values.cin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cin && Boolean(formik.errors.cin)}
                                helperText={formik.touched.cin && formik.errors.cin}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                autoComplete="disable"
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                autoComplete="new-password" // Giá trị đặc biệt cho mật khẩu
                                id="password"
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                autoComplete="disable"
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Số điện thoại"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                autoComplete="disable"
                                id="address"
                                name="address"
                                label="Địa chỉ"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && Boolean(formik.errors.address)}
                                helperText={formik.touched.address && formik.errors.address}
                            />
                        </Grid>
                    </Grid>
                    <div sx={{ mt: 3 }} className='text-center mt-4'>
                        <Button  type="submit">
                            Đăng ký
                        </Button>
                    </div>
                </form>
            </Box>
        </div>
    );
};

export default RegisterHost;
