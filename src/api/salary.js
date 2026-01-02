const BASE_URL = "http://13.235.242.96:8080/api/v1/salary";

export const getSalaryList = async () => {
  const res = await fetch(`${BASE_URL}/search/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch salary list");
  }
  return res.json();
};

export const addSalary = async (salaryData) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(salaryData),
  });
  if (!res.ok) {
    throw new Error("Failed to add salary");
  }
  return res.json();
};
