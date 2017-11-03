import { INFOUSER_UPDATE } from './constants';
export function infoUserUpdate(infouser) {
  return {
    type: INFOUSER_UPDATE,
    infouser
  };
}
