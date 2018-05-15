import { Deserializer } from 'jsonapi-serializer'
import { FETCH_AGENDAS_LIST_REQUEST, FETCH_AGENDAS_LIST_SUCCESS } from "./actionTypes";
import client from '../../client'

const deserializer = new Deserializer({ keyForAttribute: 'camelCase '});

const fetchAgendasRequest = () => ({
  type: FETCH_AGENDAS_LIST_REQUEST,
})

const fetchAgendaSuccess = (payload) => ({
  type: FETCH_AGENDAS_LIST_SUCCESS,
  payload,
})


export const fetchAgendas = () => async (dispatch) => {
  dispatch(fetchAgendasRequest());
  try {
    const response = await client.get('/agendas');

    deserializer.deserialize(response.data, (err, agendas) => {
      dispatch(fetchAgendaSuccess(agendas));
    });
  } catch (err) {
    console.error(err.response);
  }
}
