// SalaryForm.js
import React from "react";
import { Page, Grid } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { withFormik } from 'formik';
import { API_BASE_URL_SALARY } from "./config";  // http://13.201.135.171:3000/salary-add

const SalaryForm = ({ values, handleChange, handleSubmit, isSubmitting }) => {
  return (
    <SiteWrapper>
      <Page.Card title="Salary Entry"></Page.Card>
      <Grid.Col md={6} lg={6}>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="user_id">Employee ID</Label>
            <Input type="number" name="user_id" value={values.user_id} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="amount">Amount</Label>
            <Input type="number" name="amount" value={values.amount} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input type="date" name="date" value={values.date} onChange={handleChange} />
          </FormGroup>
          <Button type="submit" color="primary" disabled={isSubmitting}>Submit</Button>
        </Form>
      </Grid.Col>
    </SiteWrapper>
  );
};

const FormikSalary = withFormik({
  mapPropsToValues() { return { user_id: "", amount: "", date: "" }; },
  async handleSubmit(values, { setSubmitting, resetForm }) {
    try {
      const response = await fetch(`${API_BASE_URL_SALARY}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) { alert("Salary entry created!"); resetForm(); }
      else { const err = await response.json(); alert("Error: " + JSON.stringify(err)); }
    } catch (err) { console.error(err); alert("Failed to connect to API"); }
    setSubmitting(false);
  }
})(SalaryForm);

export default FormikSalary;
