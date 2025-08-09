import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "util";
import { IP_PUBLIC } from "../../../../config/baseUrl";
import { createTour } from "../../../../store/Host/Action";
import { uploadToCloudnary } from "../../../../utils/uploadToCloudnary";
import "./create-tour-modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: "20px",
};

const EditTourModal = ({ tour, open, handleClose }) => {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const handleSubmit = (values) => {
    dispatch(createTour(values, token));
    handleClose();
    console.log(values);
  };
  const handleSelectImage = async (event) => {
    const files = event.target.files;
    if (files.length) {
      // Upload each file and collect the URLs
      const uploadPromises = [...files].map((file) => uploadToCloudnary(file));
      try {
        const imageUrls = await Promise.all(uploadPromises);
        // Set the images in Formik's state
        formik.setFieldValue("images", [...formik.values.images, ...imageUrls]);
      } catch (error) {
        console.error("Failed to upload images:", error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: tour?.title || "",
      category: "",
      description: tour?.description || "",
      itinerary: tour?.itinerary || "",
      price: tour?.price || 0,
      durationDays: tour?.durationDays || 0,
      departureDate:
        format(new Date(tour?.departureDate), "yyyy-MM-dd") ||
        format(new Date(), "yyyy-MM-dd"),
      destination: tour?.destination || "",
      images: tour?.images || [],
      status: tour?.status || "",
      featured: tour?.featured || false,
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    axios
      .get(`http://${IP_PUBLIC}/api/v1/tours/categories`)
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
          <section className={`py-10`}>
            <div className="flex space-x-5">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Tour title"
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
                      id="outlined-basic"
                      label="Description"
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
                      id="outlined-basic"
                      label="Itinerary"
                      variant="outlined"
                      type="text"
                      name="itinerary"
                      placeholder="Itinerary"
                      className="w-100 rounded-5"
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
                      <div className="col-5">
                        <TextField
                          id="outlined-basic"
                          label="Price"
                          variant="outlined"
                          type="text"
                          name="price"
                          placeholder="Price"
                          className="w-100 rounded-5"
                          {...formik.getFieldProps("price")}
                        />
                        {formik.errors.title && formik.touched.title && (
                          <span className="text-red-500">
                            {formik.errors.title}
                          </span>
                        )}
                      </div>

                      <div className="col-5">
                        <TextField
                          id="outlined-basic"
                          label="Duration Days"
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
                    </div>
                  </div>

                  <div className="mt-3">
                    <TextField
                      id="outlined-basic"
                      label="Destination"
                      variant="outlined"
                      type="text"
                      name="destination"
                      placeholder="Destination"
                      className="w-100 rounded-5"
                      {...formik.getFieldProps("destination")}
                    />
                    {formik.errors.title && formik.touched.title && (
                      <span className="text-red-500">
                        {formik.errors.title}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <div className="row">
                      <div className="col-5">
                        <label htmlFor="category" className="mb-2">
                          Category
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
                          <option value="" label="Select a category" />
                          {categories.map((category) => (
                            <option
                              key={category.id}
                              value={category.id}
                              label={category.name}
                            />
                          ))}
                        </select>
                      </div>
                      <div className="col-5">
                        <label htmlFor="departureDate" className="mb-2">
                          Departure Date
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

                  <div className="mt-3">
                    <input
                      type="checkbox"
                      className="ckb"
                      name="featured"
                      checked={formik.values.featured}
                      onChange={formik.handleChange}
                    />
                    Featured
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
                        Update Tour
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

export default EditTourModal;
