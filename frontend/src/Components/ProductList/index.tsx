import React from "react";
import { createStyles, ListSubheader } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { IProduct } from "../../Data/api-types";
import ListItem from "./ListItem";
import { IListProps } from "./types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridList: {
    padding: 20
  },
});

const ProductList = ({ data }: IListProps) => {
  const styles = useStyles();
  return (
    <GridList className={styles.gridList}>
      {data.map((tileData: IProduct) => (
        <ListItem data={tileData} />
      ))}
    </GridList>
  );
};

export default ProductList;
