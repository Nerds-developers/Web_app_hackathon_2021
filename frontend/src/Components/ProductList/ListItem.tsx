import React from "react";
import {
  createStyles,
  IconButton,
  GridListTileBar,
  GridListTile,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { IListItemProps } from "./types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  image: {
    width: 260,
    height: 200,
  },
  tile: {
    padding: 5,
  },
});

const ListItem = ({ key, data }: IListItemProps) => {
  const styles = useStyles();
  return (
    <GridListTile className={styles.tile} key={String(key)}>
      <img src={data.image} alt={data.name} className={styles.image} />
      <GridListTileBar
        title={data.name}
        subtitle={
          <span>
            Виробник: {data.producer} Цена: {data.price}
          </span>
        }
        actionIcon={
          <IconButton
            aria-label={`info about ${data.name}`}
            className={styles.icon}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
};

export default ListItem;
