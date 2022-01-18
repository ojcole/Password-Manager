import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { SiteTableProps, SiteTableRowProps } from './types';
import { Checkbox, IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const SiteRow: React.FunctionComponent<SiteTableRowProps> = ({
  selected,
  site,
  length,
  limitedCharset,
  chooseSelected,
  deleteRow,
  updateRow,
  id,
}) => {
  const isSelected = selected == id;

  const updateLength = (newLength: number) =>
    updateRow(id, {
      site: site,
      length: newLength,
      limitedCharset: limitedCharset,
    });

  const toggleLimitedCharset = () =>
    updateRow(id, {
      site: site,
      length: length,
      limitedCharset: !limitedCharset,
    });

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
        <select
          value={length}
          onChange={(e) => updateLength(parseInt(e.target.value))}
        >
          {[...Array(32)].map((_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton onClick={toggleLimitedCharset}>
          {!limitedCharset ? (
            <LockIcon color="primary" />
          ) : (
            <LockOpenIcon color="secondary" />
          )}
        </IconButton>
      </TableCell>
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
  const { rows, selected, chooseSelected, deleteRow, updateRow } = props;

  return (
    <>
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
                updateRow={updateRow}
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
