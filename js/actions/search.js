import { SEARCH_ADD,  SEARCH_DELETE, SEARCH_CLEAR_ALL } from './constants';
export function searchAdd(search) {
  return {
    type: SEARCH_ADD,
    search
  };
}
export function searchDelete(search) {
  return {
    type: SEARCH_DELETE,
    search
  };
}
export function searchClearAll() {
  return {
    type: SEARCH_CLEAR_ALL,
  };
}
