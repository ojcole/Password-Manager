import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SiteTableProps, SiteTableRowProps } from './types';
import { Checkbox, IconButton } from '@material-ui/core';
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

const SiteTable: React.FunctionComponent<SiteTableProps> = (props) => {
  const { rows, selected, chooseSelected, deleteRow } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox disabled></Checkbox>
          </TableCell>
          <TableCell>Site</TableCell>
          <TableCell padding="checkbox"></TableCell>
        </TableRow>
      </TableHead>
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
  );
};

export default SiteTable;
