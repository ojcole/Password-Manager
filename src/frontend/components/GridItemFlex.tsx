import React from 'react';
import {
  GridProps,
  makeStyles,
  Theme,
  createStyles,
  Grid,
} from '@material-ui/core';
import { FlexAttributesI } from './types';

const useStyles = makeStyles((_: Theme) =>
  createStyles({
    grow: (props: FlexAttributesI) => {
      const resultBase = {
        flexGrow: props.grow as number,
        flexShrink: props.shrink as number,
        width: '100%',
        flexBasis: props.basis as number,
      };

      if (props.minHeight !== undefined) {
        return Object.assign({}, resultBase, {
          minHeight: props.minHeight,
          overflowY: 'auto',
        });
      }

      return resultBase;
    },
  })
);

const GridItemFlex: React.FunctionComponent<GridProps & FlexAttributesI> = ({
  shrink,
  grow,
  basis,
  minHeight,
  ...props
}) => {
  if (typeof basis === undefined) {
    basis = 'auto';
  } else if (typeof basis === 'boolean') {
    if (basis) {
      basis = 0;
    } else {
      basis = 'auto';
    }
  }

  console.log(basis);

  const classes = useStyles({
    grow: Number(grow) || 0,
    shrink: Number(shrink) || 0,
    basis,
    minHeight,
  });

  const newProps = Object.assign({}, props, {
    item: true,
    className: classes.grow,
  });

  return <Grid {...newProps} />;
};

export default GridItemFlex;
