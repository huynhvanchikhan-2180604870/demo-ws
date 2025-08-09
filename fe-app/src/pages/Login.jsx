import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import * as Yup from "yup";
import loginImg from "../assets/images/login.png";
import userImg from "../assets/images/user.png";
import { API_BASE_URL } from "../config/api";
import { loginGoole, loginUser } from "../store/Auth/Action";
import "../styles/login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      // dispatch(loginUser(values));
      // navigate("/home");
      try {
        // Check status
        const request = {
          email: formik.values.email,
        };
        const response = await axios.post(
          `${API_BASE_URL}/api/v1/auth/check`,
          request,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log("check: ", data.status);

        if (data.status) {
          enqueueSnackbar(`${data.message}`, {
            variant: "error",
          });
          return;
        }

        // Proceed to login
        dispatch(loginUser(values));
        enqueueSnackbar(`Đăng nhập thành công`, {
          variant: "success",
        });
        navigate("/home");
      } catch (error) {
        enqueueSnackbar(`Error during status check:${error}`, {
          variant: "error",
        });
        enqueueSnackbar("An error occurred. Please try again later.", {
          variant: "error",
        });
      }
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId =
    "161623696141-hqqj106vng0rai1f8vs03m9rgcoum2t8.apps.googleusercontent.com";
  const appId = "1034224698444668";

  // const handleChange = (e) => {
  //   setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  // };

  const handleClick = (e) => {
    // e.preventDefault();
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Lấy credential từ Google
      const token = credentialResponse.credential;
      // console.log("Backend response:", credentialResponse);
      // const request = {
      //   email: formik.values.email,
      // };
      // const response = await axios.post(
      //   `${API_BASE_URL}/api/v1/auth/check`,
      //   request,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // const data = response.data;
      // console.log("check: ", data.status);

      // if (data.status) {
      //   enqueueSnackbar(`${data.message}`, {
      //     variant: "error",
      //   });
      //   return;
      // }

      // // Proceed to login
      // dispatch(loginUser(formik.values));
      // enqueueSnackbar(`Đăng nhập thành công`, {
      //   variant: "success",
      // });
      // navigate("/home");
      dispatch(loginGoole(token));
      navigate("/home");
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userImg} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      id="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </FormGroup>

                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      required
                      id="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                  <div className="social__login d-flex align-items-center justify-content-between mt-3">
                    <GoogleLogin
                      width={330}
                      onSuccess={handleGoogleLoginSuccess}
                      onError={errorMessage}
                    />
                  </div>
                  {/* <div className="social__login d-flex align-items-center justify-content-between mt-3"></div> */}
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
