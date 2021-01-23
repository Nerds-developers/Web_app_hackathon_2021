import React, { useEffect, useState } from "react";
import MainPage from "./Pages/MainPage";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Theme } from "@material-ui/core";
import background from "./Assets/background.jpg";
import ApiClient from "./Data/apiClient";
import { FilterConfigs } from "./Data/api-types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {},
  })
);

const apiClient = new ApiClient();

function App() {
  const classes = useStyles();
  const [filterConfigs, setFilterConfig] = useState<FilterConfigs | null>(null);
  useEffect(() => {
    apiClient.fetchFilterConfigs().then((data) => setFilterConfig(data));
  });

  return (
    <div className={classes.app}>
      {filterConfigs ? (
        <MainPage apiClient={apiClient} filterConfigs={filterConfigs} />
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  );
}

export default App;
