import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { withFormik } from "formik";
import { ATTENDANCE_API_BASE_URL } from "./config";

const AttendanceForm = ({ values, handleChange, handleSubmit, isSubmitting }) => {
  return (
    <SiteWrapper>
      <Page.Card title="Employee Attendance"></Page.Card>
      <Grid.Col md={6} lg={6} className="align-self-center">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="id">Employee ID</Label>
            <Input
              type="text"
              name="id"
              value={values.id}
              onChange={handleChange}
              placeholder="Employee ID"
            />
          </FormGroup>

          <FormGroup>
            <Label for="name">Employee Name</Label>
            <Input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Employee Name"
            />
          </FormGroup>

          <FormGroup>
            <Label for="status">Status</Label>
            <Input
              type="select"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="date">Date</Label>
            <Input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit" color="primary" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

const FormikApp = withFormik({
  mapPropsToValues() {
    return { id: "", name: "", status: "", date: "" };
  },

  async handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      // ✅ Ensure id and date are strings
      const payload = {
        id: values.id.toString(),
        name: values.name,
        status: values.status,
        date: values.date.toString(),
      };

      console.log("Submitting payload:", payload);

      const response = await fetch(`${ATTENDANCE_API_BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert("✅ Attendance record created successfully!");
        console.log("Success:", data);
        resetForm();
      } else {
        const err = await response.json();
        alert("❌ API Error: " + JSON.stringify(err));
        console.error("API Error:", err);
      }
    } catch (err) {
      console.error("Error creating record:", err);
      alert("🚨 Failed to connect to API");
    } finally {
      setSubmitting(false);
    }
  },
})(AttendanceForm);

export default FormikApp;
