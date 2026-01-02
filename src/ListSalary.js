import React from "react";
import { Page, Grid, Table } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

class ListSalary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  loadData() {
    fetch("/api/v1/salary/search/all")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
      })
      .then((data) => {
        this.setState({ data: Array.isArray(data) ? data : [] });
      })
      .catch((err) => {
        console.error("Salary API error:", err);
        this.setState({ data: [] });
      });
  }

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
      <SiteWrapper>
        <Page.Card title="Salary List">
          <Grid.Col md={6} lg={10}>
            <Table>
              <Table.Header>
                <Table.ColHeader>Employee ID</Table.ColHeader>
                <Table.ColHeader>Name</Table.ColHeader>
                <Table.ColHeader>Salary</Table.ColHeader>
              </Table.Header>

              <Table.Body>
                {this.state.data.length === 0 ? (
                  <Table.Row>
                    <Table.Col colSpan="3" className="text-center">
                      No data available
                    </Table.Col>
                  </Table.Row>
                ) : (
                  this.state.data.map((item, i) => (
                    <Table.Row key={i}>
                      <Table.Col>
                        {item.key && item.key.id ? item.key.id : "N/A"}
                      </Table.Col>
                      <Table.Col>{item.name}</Table.Col>
                      <Table.Col>{item.salary || "N/A"}</Table.Col>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </Grid.Col>
        </Page.Card>
      </SiteWrapper>
    );
  }
}

export default ListSalary;
