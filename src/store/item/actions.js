import { CREATE_ITEM, UPDATE_ITEM } from './actionTypes'

export const createItem = (payload) => ({
  type: CREATE_ITEM,
  payload,
})

export const updateItem = (payload) => ({
  type: UPDATE_ITEM,
  payload,
})
