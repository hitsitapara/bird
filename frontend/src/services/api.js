import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Backend API URL

const handleRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    console.error("API request failed", error);
    throw error;
  }
};

export const getEmployees = () => handleRequest(() => axios.get(`${API_URL}/employees`));

export const addEmployee = (employee) => handleRequest(() => axios.post(`${API_URL}/employees`, employee));

export const updateEmployee = (id, employee) => handleRequest(() => axios.put(`${API_URL}/employees/${id}`, employee));

export const deleteEmployee = (id) => handleRequest(() => axios.delete(`${API_URL}/employees/${id}`));

