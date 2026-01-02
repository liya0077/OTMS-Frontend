import * as React from "react";
import { Page, Grid, Table, Button } from "tabler-react";   // 👈 Button import add
import SiteWrapper from "./SiteWrapper.react";
import { EMPLOYEE_API_BASE_URL } from "./config";

class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadData = this.loadData.bind(this);
  }

/*class ListEmployee extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadData = this.loadData.bind(this);
  }

  // Fetch employees
/*  loadData() {
    fetch(`${EMPLOYEE_API_BASE_URL}/search/all`)
      .then(res => res.json())
      .then(data => {
        console.log("Employee API response:", data); // Debug log
        this.setState({ data });
      })
      .catch(err => console.error("API Error:", err));
  }

  componentDidMount() {
    this.loadData();
  }*/
loadData() {
    fetch(`${EMPLOYEE_API_BASE_URL}/search/all`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Employee API response:", data);
        // ✅ if API returns null or invalid data, use []
        this.setState({ data: Array.isArray(data) ? data : [] });
      })
      .catch((err) => {
        console.error("API Error:", err);
        this.setState({ data: [] }); // ✅ fail-safe
      });
  }

  componentDidMount() {
    this.loadData();
  }


  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Employee List">
          <Grid.Col md={6} lg={10} className="align-self-center">
            <Table>
              <Table.Header>
                <Table.ColHeader>Employee ID</Table.ColHeader>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Email</Table.ColHeader>
                <Table.ColHeader>Phone Number</Table.ColHeader>
                <Table.ColHeader>Job Role</Table.ColHeader>
                <Table.ColHeader>Job Location</Table.ColHeader>
              </Table.Header>

              <Table.Body>
                {this.state.data.map((item, i) => (
                  <Table.Row key={i}>
                    <Table.Col>{item.id}</Table.Col>
                    <Table.Col>{item.name}</Table.Col>
                    <Table.Col>{item.email}</Table.Col>
                    <Table.Col>{item.phone_number}</Table.Col>
                    <Table.Col>{item.designation}</Table.Col>
                    <Table.Col>{item.office_location}</Table.Col>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Col>
        </Page.Card>
      </SiteWrapper>
    );
  }
}

export default ListEmployee;
