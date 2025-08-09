import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "util";
import { createTour } from "../../../../store/Host/Action";
import { uploadToCloudnary } from "../../../../utils/uploadToCloudnary";
import "./create-tour-modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "90vh", // Hoặc một giá trị cố định như "500px"
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  paddingX: "10px",
  outline: "none",
  borderRadius: "20px",
  overflowY: "auto",
};

const CreateTourModal = ({ open, handleClose }) => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [images, setImages] = useState(null);
  const handleSubmit = (values, actions) => {
    // Tách và làm sạch dữ liệu itinerary
    const itineraryArray = values.itinerary
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    // Tạo một bản sao của values và cập nhật trường itinerary
    const updatedValues = {
      ...values,
      itinerary: itineraryArray,
    };

    // Gửi dữ liệu đã cập nhật tới Redux store hoặc server
    dispatch(createTour(updatedValues, token));
    console.log("Create tour data: ", updatedValues);
    // Đóng modal form
    handleClose();
    actions.resetForm();
  };
  const handleSelectImage = async (event) => {
    const files = event.target.files;
    if (files.length) {
      // Upload each file and collect the URLs
      const filenames = Array.from(files).map((file) => file.name);
      // Cập nhật state images với mảng tên file mới
      setImages(filenames);
      const uploadPromises = [...files].map((file) => uploadToCloudnary(file));
      try {
        const imageUrls = await Promise.all(uploadPromises);
        // Set the images in Formik's state
        formik.setFieldValue("images", [...formik.values.images, ...imageUrls]);
        toast.success("Images uploaded successfully!");
      } catch (error) {
        console.error("Failed to upload images:", error);
        toast.error("Failed to upload images!");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      itinerary: [],
      price: 0,
      durationDays: 0,
      departureDate: format(new Date(), "yyyy-MM-dd"),
      destination: "",
      images: [],
      status: "",
      featured: false,
      maxPeople: 0,
      startingLocation: "",
      transportation: "",
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    axios
      .get("http://100.26.47.135:5000/api/v1/tours/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <section className={`py-10 mt-3`}>
            <div className="flex space-x-5">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Tên tiêu đề chuyến đi"
                      variant="outlined"
                      type="text"
                      name="title"
                      placeholder="Tour title"
                      className="w-100 rounded-5"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <span className="text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <TextField
                      multiline
                      rows={5}
                      maxRows={4}
                      id="outlined-basic"
                      label="Mô tả chi tiết chuyến đi (thêm \n) khi cần xuống dòng"
                      variant="outlined"
                      type="text"
                      name="description"
                      placeholder="Description"
                      className="w-100 rounded-5"
                      {...formik.getFieldProps("description")}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <span className="text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <TextField
                      multiline
                      rows={5}
                      maxRows={4}
                      label="Thêm hành trình của chuyến phân cách bằng xuống dòng"
                      id="outlined-basic"
                      variant="outlined"
                      type="text"
                      name="itinerary"
                      placeholder="itinerary"
                      className="w-100 rounded-1 border-none outline-none"
                      {...formik.getFieldProps("itinerary")}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <span className="text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="row">
                      <div className="col-4">
                        <TextField
                          id="outlined-basic"
                          label="Giá chuyến đi"
                          variant="outlined"
                          type="text"
                          name="price"
                          placeholder="Giá chuyến đi"
                          className="w-100 rounded-5"
                          {...formik.getFieldProps("price")}
                        />
                        {formik.errors.title && formik.touched.title && (
                          <span className="text-red-500">
                            {formik.errors.title}
                          </span>
                        )}
                      </div>

                      <div className="col-4">
                        <TextField
                          id="outlined-basic"
                          label="Số ngày đi"
                          variant="outlined"
                          type="text"
                          name="durationDays"
                          placeholder="Duration Days"
                          className="w-100 rounded-5"
                          {...formik.getFieldProps("durationDays")}
                        />
                        {formik.errors.title && formik.touched.title && (
                          <span className="text-red-500">
                            {formik.errors.title}
                          </span>
                        )}
                      </div>

                      <div className="col-4">
                        <TextField
                          id="outlined-basic"
                          label="Sô lượng người tối đa"
                          variant="outlined"
                          type="text"
                          name="maxPeople"
                          placeholder="Max Peopel"
                          className="w-100 rounded-5"
                          {...formik.getFieldProps("maxPeople")}
                        />
                        {formik.errors.title && formik.touched.title && (
                          <span className="text-red-500">
                            {formik.errors.title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <TextField
                      id="outlined-basic"
                      label="Phương tiện duy chuyển"
                      variant="outlined"
                      type="text"
                      name="transportation"
                      placeholder="transportation"
                      className="w-100 rounded-5"
                      {...formik.getFieldProps("transportation")}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <span className="text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="mt-3 row">
                    <div className="col-6">
                      <TextField
                        id="outlined-basic"
                        label="Vị trí khởi hành"
                        variant="outlined"
                        type="text"
                        name="startingLocation"
                        placeholder="Destination"
                        className="w-100 rounded-5"
                        {...formik.getFieldProps("startingLocation")}
                      />
                    </div>
                    <div className="col-6">
                      <TextField
                        id="outlined-basic"
                        label="Điểm đến"
                        variant="outlined"
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        className="w-100 rounded-5"
                        {...formik.getFieldProps("destination")}
                      />
                    </div>
                    {formik.errors.title && formik.touched.title && (
                      <span className="text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="row">
                      <div className="col-6">
                        <label htmlFor="category" className="mb-2 ms-2">
                          Thể loại của chuyến đi
                        </label>
                        <select
                          name="category"
                          value={formik.values.category}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "13px",
                            outline: "none",
                          }}
                        >
                          <option value="" label="Chọn một thể loại" />
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              value={category.id}
                              label={category.name}
                            />
                          ))}
                        </select>
                      </div>
                      <div className="col-6 ">
                        <label htmlFor="departureDate" className="mb-2 ms-2">
                          Ngày khởi hành
                        </label>
                        <input
                          type="date"
                          id="departureDate"
                          name="departureDate"
                          value={formik.values.departureDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "13px",
                            outline: "none",
                          }}
                        />
                        {formik.touched.departureDate &&
                        formik.errors.departureDate ? (
                          <div>{formik.errors.departureDate}</div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 mb-4 ps-2">
                    <input
                      type="checkbox"
                      className="ckb"
                      name="featured"
                      checked={formik.values.featured}
                      onChange={formik.handleChange}
                    />
                    Đánh dấu nổi bật
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-5 items-center mb-2">
                      <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                        <ImageIcon className="me-3" />
                        <input
                          type="file"
                          name="imageFile"
                          className="hidden"
                          onChange={handleSelectImage}
                          multiple
                        />
                      </label>

                      <div className="mt-4 mb-4">
                        {images?.map((image, index) => (
                          <div className="row">
                            <div className="col-6">
                              <p>Ảnh thứ {index}</p>
                            </div>
                            <div className="col-6">
                              <p key={index}>{image}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          borderRadius: "20px",
                          paddingY: "8px",
                          paddingX: "20px",
                          bgcolor: "#1e88e5",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Create Tour
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTourModal;
