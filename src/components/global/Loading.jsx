import React from "react";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  fullHeight: {
    height: "100vh",
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <Grid
      className={classes.fullHeight}
      container
      direction="column"
      justify="center"
    >
      <Grid item container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </Grid>
  );
}
