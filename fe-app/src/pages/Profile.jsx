import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ChangePasswordModal from "../shared/ChangePasswordModal";
import { getUserProfile, updateProfile } from "../store/Auth/Action";
import "../styles/profile.css";

const validationSchema = Yup.object().shape({
  cin: Yup.string().required("Citizen Identification Number is required"),
  phone: Yup.string().required("Phone is required"),
});

function Profile() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleResetPassword = () => {
    handleOpen();
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      cin: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
    },
  });

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(getUserProfile(jwt));
  }, []);

  useEffect(() => {
    if (auth?.user) {
      formik.setValues({
        username: auth?.user?.username,
        cin: auth?.user?.cin,
        phone: auth?.user?.phone,
        address: auth?.user?.address,
      });
    }
  }, []);

  return (
    <div className="container">
      <div className="row gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img
                      src="https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-17.jpg"
                      alt="Maxwell Admin"
                    />
                  </div>
                  <h5 className="user-name">{auth?.user?.username}</h5>
                  <h6 className="user-email">{auth?.user?.email}</h6>
                </div>
                <div className="about">
                  {/* <h5>About</h5>
                  <p>
                    I'm Yuki. Full Stack Designer I enjoy creating user-centric,
                    delightful and human experiences.
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">
                      Thông tin cá nhân chi tiết
                    </h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName" className="mb-2">
                        Họ và tên
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="eMail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="eMail"
                      placeholder="Enter email ID"
                    />
                  </div>
                </div> */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone" className="mb-2">
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        required
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                    <div className="form-group">
                      <label htmlFor="website" className="mb-2">
                        Số CMND/CCCD
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cin"
                        required
                        value={formik.values.cin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Địa chỉ</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Street">Thông tin địa chỉ</label>
                      <input
                        type="name"
                        className="form-control"
                        id="address"
                        required
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters mt-3 text-center">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button type="submit" className="btn secondary__btn me-3">
                        Cập nhật thông tin
                      </button>
                      <button
                        className="btn primary__btn"
                        onClick={handleResetPassword}
                      >
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <section>
        <ChangePasswordModal open={open} handleClose={handleClose} />
      </section>
    </div>
  );
}
export default Profile;
