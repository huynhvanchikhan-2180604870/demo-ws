import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import * as Yup from "yup";
import registerImg from "../assets/images/register.png";
import userImg from "../assets/images/user.png";
import VerifyModal from "../shared/VerifyModal";
import { register } from "../store/Auth/Action";
import "../styles/login.css";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Fullname is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleOpenVerifyModal = () => setOpenVerifyModal(true);
  const handleCloseVerifyModal = () => setOpenVerifyModal(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form values", values);
      dispatch(register(values));
      setEmail(values.email);
      setPassword(values.password);
      handleOpenVerifyModal();
    },
  });

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div className="login__img">
                  <img src={registerImg} alt="" />
                </div>

                <div className="login__form">
                  <div className="user">
                    <img src={userImg} alt="" />
                  </div>
                  <h2>Register</h2>

                  <Form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                      <input
                        type="text"
                        placeholder="Fullname"
                        required
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.username &&
                          Boolean(formik.errors.username)
                        }
                        helperText={
                          formik.touched.username && formik.errors.username
                        }
                      />
                    </FormGroup>
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
                        type="phone_number"
                        placeholder="Phone number"
                        required
                        id="phone_number"
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phone_number &&
                          Boolean(formik.errors.phone_number)
                        }
                        helperText={
                          formik.touched.phone_number &&
                          formik.errors.phone_number
                        }
                      />
                    </FormGroup>

                    <FormGroup>
                      <input
                        type="address"
                        placeholder="Address"
                        required
                        id="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                        helperText={
                          formik.touched.address && formik.errors.address
                        }
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
                    <Button className="btn secondary__btn auth__btn">
                      Create Account
                    </Button>
                  </Form>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

        <VerifyModal
          open={openVerifyModal}
          handleClose={handleCloseVerifyModal}
          email={email}
          password={password}
        />
    </>
  );
};

export default Register;
