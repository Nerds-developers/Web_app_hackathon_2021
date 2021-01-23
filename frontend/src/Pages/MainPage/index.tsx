import React, { useEffect } from "react";
import ApiClient from "../../Data/apiClient";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import ProductList from "../../Components/ProductList";
import {
  AppBar,
  Box,
  Divider,
  Grid,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { useState } from "react";
import { FilterConfigs, IProduct, Shop } from "../../Data/api-types";
import { filter as filterByPatter } from "lodash";
import Filters from "../../Components/Filters";

export type MainPageProps = {
  apiClient: ApiClient;
  filterConfigs: FilterConfigs;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
      padding: 0,
      height: "100vh",
    },
    tab: {
      color: "white",
      paddingTop: 50,
    },
    body: {
      height: "100vh",
    },
  })
);

const MainPage = ({ apiClient, filterConfigs }: MainPageProps) => {
  const classes = useStyles();
  const [tab, setTab] = useState<"all" | Shop>("all");
  const [data, setData] = useState<IProduct[]>([]);
  const [filter, setFilter] = useState({});

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: "all" | Shop
  ) => {
    setTab(newValue);
  };
  useEffect(() => {
    apiClient.fetchProducts(filter).then((data: IProduct[]) => {
      setData(data);
    });
  });

  return (
    <Container maxWidth="lg" className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={handleChange}
          className={classes.tab}
          centered
        >
          <Tab label="Всі" value={"all"} />
          <Tab label="АТБ" value={"atb"} />
          <Tab label="Сільпо" value={"silpo"} />
          <Tab label="МЕТРО" value={"metro"} />
        </Tabs>
      </AppBar>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        className={classes.body}
      >
        <Grid item xs={3} md={3}>
          <Filters configs={filterConfigs} />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={8} md={8}>
          <ProductList
            data={tab === "all" ? data : filterByPatter(data, { shop: tab })}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MainPage;
