import { HOME_DATA_UPDATE } from './constants';
export function homeDataUpdate(home) {
  return {
    type: HOME_DATA_UPDATE,
    home
  };
}
