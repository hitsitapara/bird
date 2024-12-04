import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEmployee, getEmployees } from "../services/api";
import EmployeeTable from "./EmployeeTable";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();

    return () => {
      setEmployees([]);
      setLoading(false);
      setError(null);
    };
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployees();
      setEmployees(response);
    } catch (error) {
      setError(error.message);
      toast.error("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully!");
      fetchEmployees(); // Refresh list after deletion
    } catch (error) {
      toast.error("Failed to delete employee.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Employee Dashboard</h2>
      {loading && <div className="spinner-border" />}
      {!loading && !error && (
        <>
          <button
            className="btn btn-primary mb-3"
            onClick={() => navigate("/add")}
          >
            Add Employee
          </button>
          {employees.length > 0 ? (
            <EmployeeTable employees={employees} onDelete={handleDelete} />
          ) : (
            <div>No Employee found</div>
          )}
        </>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default Dashboard;
