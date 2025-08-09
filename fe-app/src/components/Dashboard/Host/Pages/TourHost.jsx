import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { deleteTour, fetchToursOfHost } from "../../../../store/Host/Action";
import CreateTourModal from "./CreateTourModal";
import EditTourModal from "./EditTourModal";
import "./tour-host.css";

const TourHost = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  // Local state for pagination and search
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateTourModal, setOpenCreateTourModal] = useState(false);
  const [editTour, setEditTour] = useState(null);

  // Redux state
  const { data, totalElements, loading, error } = useSelector(
    (state) => state.host
  );

  const fetchData = () => {
    const params = {
      pageNumber,
      pageSize,
      sortField,
      sortOrder,
      searchTerm,
    };
    console.log("Calling fetchTours with params:", params);
    dispatch(fetchToursOfHost(params, token));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pageNumber, pageSize, sortField, sortOrder, searchTerm]);

  useEffect(() => {
    if (editTour !== null) {
      console.log("Edit tour with objects:", editTour);
    }
  }, [editTour]); // This effect runs only when editTour changes

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      dispatch(deleteTour(id, token)).then(() => {
        fetchData(); // Refresh the data after deletion
      });
    }
  };

  const handleOpenCreateTourModal = () => setOpenCreateTourModal(true);

  const handleCloseOpenCreateTourModal = () => setOpenCreateTourModal(false);

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            onClick={() => clickEdit(row)}
            className="btn-create action-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn-create action-button ms-2"
          >
            Delete
          </button>
        </>
      ),
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      // Optionally, you can format the UUID if needed
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Host",
      selector: (row) => (row.host ? row.host.username : "N/A"),
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      // If you have category names, you might need to map UUID to name
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
      // Consider truncating long descriptions
      cell: (row) => (
        <div title={row.description}>
          {row.description.length > 50
            ? row.description.substring(0, 50) + "..."
            : row.description}
        </div>
      ),
    },
    {
      name: "Itinerary",
      selector: (row) => row.itinerary,
      sortable: false,
      cell: (row) => (
        <div title={row.itinerary}>
          {row.itinerary.length > 50
            ? row.itinerary.substring(0, 50) + "..."
            : row.itinerary}
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => `$${row.price.toFixed(2)}`,
    },
    {
      name: "Duration (Days)",
      selector: (row) => row.durationDays,
      sortable: true,
    },
    {
      name: "Departure Date",
      selector: (row) => row.departureDate,
      sortable: true,
      cell: (row) => formatDate(row.departureDate),
    },
    {
      name: "Destination",
      selector: (row) => row.destination,
      sortable: true,
    },
    {
      name: "Images",
      selector: (row) => row.images,
      sortable: false,
      cell: (row) => (
        <div>
          {row.images && row.images.length > 0 ? (
            <img
              src={row.images[0]}
              alt="Tour"
              style={{ width: "50px", height: "50px" }}
            />
          ) : (
            "No Image"
          )}
        </div>
      ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => formatDate(row.createdAt),
    },
    {
      name: "Featured",
      selector: (row) => row.featured,
      sortable: true,
      cell: (row) => (row.featured ? "Yes" : "No"),
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };
  const clickEdit = (tour) => {
    setEditTour(tour);
    setOpenCreateTourModal(true)
    console.log("Edit tour with objects:", editTour);
  };

  return (
    <>
      <section className="w-100">
        <div className="pt-0 d-flex justify-content-between align-items-center">
          <InputGroup
            style={{
              maxWidth: "300px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <InputGroupText style={{ backgroundColor: "#F5F5F7" }}>
              <SearchIcon />
            </InputGroupText>
            <Input
              type="text"
              placeholder="Search something..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPageNumber(1); // Reset to first page when searching
              }}
              style={{
                backgroundColor: "#F5F5F7",
                border: "none",
                boxShadow: "none",
              }}
            />
          </InputGroup>
          <Button
            className="secondary__btn btn-create"
            onClick={handleOpenCreateTourModal}
          >
            Create Tour
          </Button>
        </div>
      </section>
      <section className="w-100 border mb-5 content">
        {/* Data Table */}
        <DataTable
          columns={columns}
          data={Array.isArray(data) ? data : []}
          progressPending={loading}
          pagination
          paginationServer
          paginationTotalRows={totalElements}
          onChangeRowsPerPage={(newPageSize, newPageNumber) => {
            setPageSize(newPageSize);
            setPageNumber(newPageNumber);
          }}
          onChangePage={(newPageNumber) => {
            setPageNumber(newPageNumber);
          }}
          onSort={(column, sortDirection) => {
            setSortField(column.selector);
            setSortOrder(sortDirection);
          }}
        />

        {/* Error Message */}
        {error && <div style={{ color: "red" }}>Error: {error}</div>}
      </section>

      <section>
        <CreateTourModal
          open={openCreateTourModal}
          handleClose={handleCloseOpenCreateTourModal}
        />
      </section>
      {/* <section>
        <EditTourModal
          tour={editTour}
          open={openCreateTourModal}
          handleClose={handleCloseOpenCreateTourModal}
        />
      </section> */}
    </>
  );
};

export default TourHost;
