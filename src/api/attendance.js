const BASE_URL = "http://13.235.242.96/api/v1/attendance";

/* export const createAttendance = async (payload) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const searchAttendance = async (id) => {
  const res = await fetch(`${BASE_URL}/search?id=${id}`);
  return res.json();
};*/


export const createAttendance = async (payload) => {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};
export const searchAttendance = async (id) => {
  const res = await fetch(`${BASE_URL}/search?id=${id}`);
  return res.json();
};

