import { values, get } from 'lodash'

export const getItemsLoading = (state) => get(state, 'item.loadng', false);

export const getItems = (state) => values(get(state, 'item.byId', {}));

export const getItem = (state, id) => get(state, ['item', 'byId', id]);
