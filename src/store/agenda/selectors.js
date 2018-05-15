import { values, get } from 'lodash'

export const getAgendasLoading = (state) => get(state, 'agenda.loading', false)

export const getAgendas = (state) => values(get(state, 'agenda.byId', {}))
