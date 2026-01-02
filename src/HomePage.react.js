import * as React from "react";
import { Page, Grid, StatsCard } from "tabler-react";
import SiteWrapper from "./SiteWrapper.react";

import {
  ListAllEmployees,
  ListEmployeeActiveEmployee,
  ListEmployeeExEmployee,
  RoleDistribution,
  LocationDistribution,
  StatusDistribution,
} from "./EmployeeData";

function HomePage() {
  return (
    <SiteWrapper>
      <Page.Content title="Dashboard">
        <Grid.Row cards>
          {/* Total Employees */}
          <ListAllEmployees />

          {/* Active Employees */}
          <ListEmployeeActiveEmployee />

          {/* Inactive Employees */}
          <ListEmployeeExEmployee />

          {/* Office Locations */}
          <Grid.Col sm={3}>
            <StatsCard
              layout={1}
              movement={0}
              total="4"
              label="Office Locations"
            />
          </Grid.Col>
        </Grid.Row>

        {/* Charts Row */}
        <Grid.Row cards>
          <RoleDistribution />
          <StatusDistribution />
          <LocationDistribution />
        </Grid.Row>
      </Page.Content>
    </SiteWrapper>
  );
}

export default HomePage;
