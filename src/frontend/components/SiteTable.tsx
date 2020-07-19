import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SiteTableProps, SiteTableRowProps } from './types';
import { Checkbox } from '@material-ui/core';

const SiteRow: React.FunctionComponent<SiteTableRowProps> = ({
  selected,
  site,
  chooseSelected,
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
    </TableRow>
  );
};

const SiteTable: React.FunctionComponent<SiteTableProps> = (props) => {
  const { rows, selected, chooseSelected } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox disabled></Checkbox>
          </TableCell>
          <TableCell>Site</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <SiteRow
            key={row.id}
            selected={selected}
            chooseSelected={chooseSelected}
            {...row}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SiteTable;
