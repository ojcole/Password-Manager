import { InputProps, TextFieldProps } from '@material-ui/core';
import { Site, Config } from '../../electron/types';
import { AppSettings } from '../settings/types';

interface SiteRow {
  selected: number;
  chooseSelected: (index: number) => void;
  deleteRow: (index: number) => void;
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
  passwordValues: String[];
}

export interface PasswordDisplayProps {
  content: string;
  passwordSetters: ((value: string) => void)[];
  animate: boolean;
}

export interface FilterSearchProps {
  setText: (val: string) => void;
  enterPressed: () => void;
}

export interface FlexAttributesI {
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: boolean | 'auto' | number;
  minHeight?: number;
}

export interface MainGridProps {
  paddingSpacing?: number;
}

export interface SettingsProps {
  settings: AppSettings;
  loadConfig: (config: Config) => void;
}

export type MainProps = {
  settings: SettingsProps['settings'];
};

export type LongInputProps = TextFieldProps & {};

export interface LongInputGridProps {
  inputs: JSX.Element[];
}

export interface AddSitesProps {
  addSite: (site: string) => boolean;
}

export type SitesToolsProps = FilterSearchProps & AddSitesProps;
