import React, { useState, useEffect } from "react";
import { Grid, StatsCard, Card, colors } from "tabler-react";
import C3Chart from "react-c3js";
import { EMPLOYEE_API_BASE_URL } from "./config";

function useEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${EMPLOYEE_API_BASE_URL}/search/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Employee API Response:", data);
        setEmployees(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setEmployees([]);
      });
  }, []);

  return employees;
}

// ================= COMPONENTS =================

export function ListAllEmployees() {
  const employees = useEmployees();
  const total = employees.length;

  return (
    <Grid.Col sm={3}>
      <StatsCard layout={1} movement={0} total={total} label="Total Employees" />
    </Grid.Col>
  );
}

export function ListEmployeeActiveEmployee() {
  const employees = useEmployees();
  const active = employees.filter(
    (e) => e.status && e.status.toLowerCase().includes("current")
  ).length;

  return (
    <Grid.Col sm={3}>
      <StatsCard layout={1} movement={0} total={active} label="Active Employees" />
    </Grid.Col>
  );
}

export function ListEmployeeExEmployee() {
  const employees = useEmployees();
  console.log("Statuses:", employees.map(e => e.status));

  const ex = employees.filter(
    (e) => e.status && e.status.trim().toLowerCase().includes("ex")
  ).length;

  return (
    <Grid.Col sm={3}>
      <StatsCard layout={1} movement={0} total={ex} label="Ex-Employees" />
    </Grid.Col>
  );
}

export function RoleDistribution() {
  const employees = useEmployees();

  const roleDist = employees.reduce((acc, emp) => {
    if (emp.designation) {
      acc[emp.designation] = (acc[emp.designation] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Job Role Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: Object.entries(roleDist),
              type: "donut",
              colors: {
                DevOps: colors["blue"],
                Developer: colors["blue-darker"],
                HR: colors["orange"],
                trainer: colors["red"],
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export function LocationDistribution() {
  const employees = useEmployees();

  const locationDist = employees.reduce((acc, emp) => {
    if (emp.office_location) {
      acc[emp.office_location] = (acc[emp.office_location] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Locations Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: Object.entries(locationDist),
              type: "donut",
              colors: {
                Delhi: colors["blue-darker"],
                Bangalore: colors["blue"],
                Noida: colors["blue-light"],
                Newyork: colors["blue-lighter"],
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

export function StatusDistribution() {
  const employees = useEmployees();

  const active = employees.filter(
    (e) => e.status && e.status.toLowerCase().includes("current")
  ).length;

  const ex = employees.filter(
    (e) => e.status && e.status.toLowerCase().includes("ex")
  ).length;

  return (
    <Grid.Col sm={4}>
      <Card>
        <Card.Header>
          <Card.Title>Employees Distribution</Card.Title>
        </Card.Header>
        <Card.Body>
          <C3Chart
            style={{ height: "12rem" }}
            data={{
              columns: [
                ["Current Employees", active],
                ["Ex-Employees", ex],
              ],
              type: "donut",
              colors: {
                "Current Employees": colors["blue-darker"],
                "Ex-Employees": colors["blue"],
              },
            }}
            legend={{ show: false }}
            padding={{ bottom: 0, top: 0 }}
          />
        </Card.Body>
      </Card>
    </Grid.Col>
  );
}

