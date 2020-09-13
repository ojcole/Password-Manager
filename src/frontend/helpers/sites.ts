import { Site } from '../../electron/types';
import { SiteTableRow } from '../components/types';

export const sitesToRows = (sites: Site[]): SiteTableRow[] =>
  sites.map((elem, i) => Object.assign(elem, { id: i }));
