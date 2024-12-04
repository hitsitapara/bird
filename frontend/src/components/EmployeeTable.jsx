import React from "react";
import { useNavigate } from "react-router-dom";

function EmployeeTable({ employees, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="table-container" style={{ overflowX: 'auto' }}>
    <table className="table table-striped align-middle">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.position}</td>
            <td>{employee.salary}</td>
            <td>
              <button
                className="btn btn-warning me-2"
                onClick={() => navigate(`/edit/${employee.id}`)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(employee.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default EmployeeTable;
