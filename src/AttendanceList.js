import * as React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";
import { ATTENDANCE_API_BASE_URL } from "./config";

class AttendanceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch(`${ATTENDANCE_API_BASE_URL}/search/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Attendance List"></Page.Card>
        <Grid.Col md={6} lg={10} className="align-self-center">
          <Table>
            <Table.Header>
              <Table.ColHeader>Employee ID</Table.ColHeader>
              <Table.ColHeader>Name</Table.ColHeader>
              <Table.ColHeader>Status</Table.ColHeader>
              <Table.ColHeader>Date</Table.ColHeader>
            </Table.Header>
            <Table.Body>
              {this.state.data.map((item, i) => (
                <Table.Row key={i}>
                  <Table.Col>{item.id}</Table.Col>
                  <Table.Col>{item.name}</Table.Col>
                  <Table.Col>{item.status}</Table.Col>
                  <Table.Col>{item.date}</Table.Col>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Col>
      </SiteWrapper>
    );
  }
}

export default AttendanceList;
