import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Col, Form, FormGroup } from "reactstrap";
import { IP_PUBLIC } from "../config/baseUrl";
import "./search-bar.css";

export const SearchBar = ({ onSearch }) => {
  const [categories, setCategories] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const formik = useFormik({
    initialValues: {
      destination: undefined,
      departureDate: undefined,
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
      onSearch(values); // Gọi hàm onSearch được truyền từ component cha
    },
  });

  useEffect(() => {
    // Fetch categories from the API
    axios
      .get(`http://${IP_PUBLIC}/api/v1/tours/categories`)
      .then((response) => {
        console.log("category: ", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch destinations from the API
    axios
      .get(`http://${IP_PUBLIC}/api/v1/tours/destinations`)
      .then((response) => {
        console.log("destinations: ", response.data);
        setDestinations(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const searchHandler = () => {};
  return (
    <Col lg="12">
      <div className="search__bar">
        <Form
          className="d-flex align-items-center gap-4"
          onSubmit={formik.handleSubmit}
        >
          <FormGroup className="d-flex g-3 form__group form__group-fast">
            <span className="mt-2">
              <i className="ri-map-pin-line"></i>
            </span>
            <div className="ms-auto">
              <h6 className="ms-3 mb-0 pb-0">Điểm đến</h6>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={destinations}
                getOptionLabel={(option) => option?.name} // Assuming your options are objects with 'title' properties
                sx={{ width: 230, border: "none", outline: "none" }}
                onChange={(event, value) =>
                  formik.setFieldValue("destination", value ? value.name : "")
                }
                renderOption={(props, option) => (
                  <li {...props}>
                    {option?.name}{" "}
                    <span
                      key={option.id}
                      style={{
                        color: "gray",
                        fontSize: "15px",
                        paddingLeft: "5px",
                      }}
                    >
                      ( {option?.tourCount} tours)
                    </span>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    placeholder="Chọn điểm đến"
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Remove border
                        },
                        "&:hover fieldset": {
                          border: "none", // Remove border on hover
                        },
                        "&.Mui-focused fieldset": {
                          border: "none", // Remove border on focus
                          outline: "none", // Removing outline on focus
                        },
                      },
                    }}
                    name="destination"
                    value={formik.values.destination}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex g-3 form__group form__group-fast">
            <span className="mt-2">
              <i className="ri-calendar-line"></i>
            </span>
            <div className="ms-3 mb-2">
              <h6 className="mb-2">Ngày khởi hành</h6>
              <input
                type="date"
                name="departureDate"
                className="pt-2 me-4 mb-3"
                onChange={formik.handleChange} // Bind Formik handleChange
                value={formik.values.departureDate} // Bind Formik value
              />
              {/* <DesktopDatePicker label="Basic date picker" /> */}
            </div>
          </FormGroup>

          <FormGroup className="d-flex g-3 form__group form__group-last">
            <span>
              <i class="ri-earth-line mt-2"></i>
            </span>
            <div className="ms-2">
              <h6 className="ms-3">Loại hình chuyến đi</h6>
              {/* <select
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="category"
                className="select_cate pt-2"
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categories}
                getOptionLabel={(option) => option?.name} // Assuming your options are objects with 'title' properties
                sx={{ width: 230, border: "none", outline: "none" }}
                onChange={(event, value) =>
                  formik.setFieldValue("category", value ? value.id : "")
                }
                renderInput={(params) => (
                  <TextField
                    placeholder="Chọn loại hình tours"
                    {...params}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Remove border
                        },
                        "&:hover fieldset": {
                          border: "none", // Remove border on hover
                        },
                        "&.Mui-focused fieldset": {
                          border: "none", // Remove border on focus
                          outline: "none", // Removing outline on focus
                        },
                      },
                    }}
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
              />
            </div>
          </FormGroup>

          <button className="search__icon" type="submit">
            <i className="ri-search-line"></i>
          </button>
        </Form>
      </div>
    </Col>
  );
};
