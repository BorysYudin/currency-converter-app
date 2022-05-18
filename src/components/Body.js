import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export const Body = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Paper sx={{ bgcolor: "#fff", margin: "12px 0"}}>
          <Grid container>{props.children}</Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};
