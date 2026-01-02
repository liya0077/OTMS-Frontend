//
// Correct base URL
const BASE_URL = "http://13.235.242.96:8080/api/v1/employee";

// Get all employees
export const getAllEmployees = async () => {
  const res = await fetch(`${BASE_URL}/search/all`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return res.json();
};

// Create employee
export const createEmployee = async (payload) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

// Get employees by status
export const getEmployeeStatus = async () => {
  const res = await fetch(`${BASE_URL}/search/status`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return res.json();
};

// Get employees by role
export const getEmployeeRoles = async () => {
  const res = await fetch(`${BASE_URL}/search/roles`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return res.json();
};

// Get employees by location
export const getEmployeeLocations = async () => {
  const res = await fetch(`${BASE_URL}/search/location`, {
    headers: { "Cache-Control": "no-cache" },
  });
  return res.json();
};
