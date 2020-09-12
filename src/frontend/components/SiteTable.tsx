import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { SiteTableProps, SiteTableRowProps } from './types';
import {
  Checkbox,
  IconButton,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const SiteRow: React.FunctionComponent<SiteTableRowProps> = ({
  selected,
  site,
  chooseSelected,
  deleteRow,
  id,
}) => {
  const isSelected = selected == id;

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onClick={() => {
            if (isSelected) {
              chooseSelected(-1);
            } else {
              chooseSelected(id);
            }
          }}
        ></Checkbox>
      </TableCell>
      <TableCell>{site}</TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={() => deleteRow(id)}>
          <DeleteOutlineIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const EmptyRow: React.FunctionComponent = () => {
  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell>No Sites</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      width: '100%',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[900],
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  })
);

const THeader: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.heading}>
      <Typography variant="h6">Sites</Typography>
    </div>
  );
};

const SiteTable: React.FunctionComponent<SiteTableProps> = (props) => {
  const { rows, selected, chooseSelected, deleteRow } = props;

  return (
    <>
      <THeader />
      <Table>
        <TableBody>
          {rows.length === 0 ? (
            <EmptyRow />
          ) : (
            rows.map((row) => (
              <SiteRow
                key={row.id}
                selected={selected}
                chooseSelected={chooseSelected}
                deleteRow={deleteRow}
                {...row}
              />
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default SiteTable;
