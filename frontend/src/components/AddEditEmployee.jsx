import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployees, addEmployee, updateEmployee } from "../services/api";

function AddEditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    position: "",
    salary: "",
  });
  const [error, setError] = useState(null);

  // Release all state variable when component unmount
  useEffect(() => {
    return () => {
      setEmployee({
        name: "",
        email: "",
        position: "",
        salary: "",
      });
      setError(null);
    };
  }, []);

  useEffect(() => {
    if (id) {
      fetchEmployeeDetails();
    }
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await getEmployees();
      const selectedEmployee = response.find((emp) => emp.id === parseInt(id));
      if (selectedEmployee) setEmployee(selectedEmployee);
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch employee details.");
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      if (id) {
        await updateEmployee(id, employee);
        toast.success("Employee updated successfully!");
      } else {
        await addEmployee(employee);
        toast.success("Employee added successfully!");
      }
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
      toast.error("Failed to save employee.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="salary">
            Salary
          </label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddEditEmployee;
