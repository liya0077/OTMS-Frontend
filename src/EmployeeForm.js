import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";
import {
  EMPLOYEE_API_BASE_URL,
  SALARY_API_BASE_URL,
  NOTIFICATION_API_BASE_URL
} from "./config";

const EmployeeForm = ({
  values,
  handleChange,
  handleSubmit,
  isSubmitting,
  errors,
  touched
}) => {
  return (
    <SiteWrapper>
      <Page.Card title="Employee Registration" />

      <Grid.Col md={6} lg={6}>
        <Form onSubmit={handleSubmit}>

          {/* Employee ID */}
          <FormGroup>
            {touched.id && errors.id && <p className="red">{errors.id}</p>}
            <Label for="id">Employee ID</Label>
            <Input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              id="id"
              placeholder="Employee ID"
            />
          </FormGroup>

          {/* Name */}
          <FormGroup>
            {touched.name && errors.name && <p className="red">{errors.name}</p>}
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Employee Name"
            />
          </FormGroup>

          {/* Department (✅ ADDED) */}
          <FormGroup>
            {touched.department && errors.department && (
              <p className="red">{errors.department}</p>
            )}
            <Label for="department">Department</Label>
            <Input
              type="text"
              name="department"
              value={values.department}
              onChange={handleChange}
              id="department"
              placeholder="Department"
            />
          </FormGroup>

          {/* Address */}
          <FormGroup>
            {touched.address && errors.address && (
              <p className="red">{errors.address}</p>
            )}
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange}
              id="address"
              placeholder="Employee Address"
            />
          </FormGroup>

          {/* Email */}
          <FormGroup>
            {touched.email && errors.email && <p className="red">{errors.email}</p>}
            <Label for="email">Email ID</Label>
            <Input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="Email ID"
            />
          </FormGroup>

          {/* Phone */}
          <FormGroup>
            {touched.phone_number && errors.phone_number && (
              <p className="red">{errors.phone_number}</p>
            )}
            <Label for="phone_number">Phone Number</Label>
            <Input
              type="text"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange}
              id="phone_number"
              placeholder="Phone Number"
            />
          </FormGroup>

          {/* Salary */}
          <FormGroup>
            {touched.salary && errors.salary && (
              <p className="red">{errors.salary}</p>
            )}
            <Label for="salary">Salary</Label>
            <Input
              type="number"
              name="salary"
              value={values.salary}
              onChange={handleChange}
              id="salary"
              placeholder="Salary"
            />
          </FormGroup>

          {/* Designation */}
          <FormGroup>
            {touched.designation && errors.designation && (
              <p className="red">{errors.designation}</p>
            )}
            <Label for="designation">Job Role</Label>
            <Input
              type="select"
              name="designation"
              id="designation"
              value={values.designation}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="DevOps">DevOps</option>
            </Input>
          </FormGroup>

          {/* Status */}
          <FormGroup>
            {touched.status && errors.status && (
              <p className="red">{errors.status}</p>
            )}
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              id="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Ex-Employee">Ex-Employee</option>
              <option value="Current Employee">Current Employee</option>
            </Input>
          </FormGroup>

          {/* Office Location */}
          <FormGroup>
            {touched.office_location && errors.office_location && (
              <p className="red">{errors.office_location}</p>
            )}
            <Label for="office_location">Location</Label>
            <Input
              type="select"
              name="office_location"
              id="office_location"
              value={values.office_location}
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Newyork">Newyork</option>
            </Input>
          </FormGroup>

          {/* Joining Date */}
          <FormGroup>
            {touched.joining_date && errors.joining_date && (
              <p className="red">{errors.joining_date}</p>
            )}
            <Label for="joining_date">Joining Date</Label>
            <Input
              type="date"
              name="joining_date"
              id="joining_date"
              value={values.joining_date}
              onChange={handleChange}
            />
          </FormGroup>

          <Button color="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

const FormikEmployee = withFormik({
  mapPropsToValues() {
    return {
      id: "",
      name: "",
      department: "",   // ✅ ADDED
      address: "",
      email: "",
      phone_number: "",
      salary: "",
      designation: "",
      status: "",
      office_location: "",
      joining_date: ""
    };
  },

  async handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      const formattedDate = values.joining_date
        ? new Date(values.joining_date).toISOString().split("T")[0]
        : null;

      const payload = {
        id: values.id,
        name: values.name,
        department: values.department, // ✅ ADDED
        address: values.address,
        email: values.email,
        phone_number: values.phone_number,
        salary: Number(values.salary),
        designation: values.designation,
        status: values.status,
        office_location: values.office_location,
        joining_date: formattedDate
      };

      const response = await fetch(`${EMPLOYEE_API_BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Employee created successfully!");
        resetForm();

        const today = new Date().toISOString().split("T")[0];

        await fetch(`${SALARY_API_BASE_URL}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: { id: values.id, processDate: today },
            name: values.name,
            salary: Number(values.salary),
            status: "Active"
          })
        });

        await fetch(`${NOTIFICATION_API_BASE_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email })
        });

      } else {
        const err = await response.json();
        alert("Error: " + JSON.stringify(err));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to API");
    }

    setSubmitting(false);
  }
})(EmployeeForm);

export default FormikEmployee;
