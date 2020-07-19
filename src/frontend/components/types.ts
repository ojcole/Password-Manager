import { InputProps } from '@material-ui/core';
import { Site } from '../../electron/types';

interface SiteRow {
  selected: number;
  chooseSelected: (index: number) => void;
}

export type SiteTableRow = Site & {
  id: number;
};

export type SiteTableProps = SiteRow & {
  rows: SiteTableRow[];
};

export type SiteTableRowProps = SiteTableRow & SiteRow;

export interface PassInputProps {
  onChange: InputProps['onChange'];
}

export interface PasswordInputsProps {
  passwordSetters: ((val: string) => void)[];
}

export interface PasswordDisplayProps {
  content: string;
}

export interface FilterSearchProps {
  setText: (val: string) => void;
}

export interface MainProps {
  sites: SiteTableRow[];
}
