import React, { PureComponent } from 'react'
import { isEmpty } from 'lodash'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import Agenda from '../Agenda';
import { fetchAgendas } from '../../../store/agenda/actions';
import { getAgendas, getAgendasLoading } from '../../../store/agenda/selectors';

export class AgendaList extends PureComponent {
  componentDidMount() {
    this.props.fetchAgendas();
  }

  render() {
    const { loading, agendas } = this.props;

    if (loading) {
      return (
        <h1>Loading agendas...</h1>
      )
    }

    if (isEmpty(agendas)) {
      return <h1>No agendas found</h1>
    }

    return (
      <div>
        {agendas.map((agenda) => (
          <Agenda key={agenda.id} agenda={agenda} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: getAgendasLoading(state),
  agendas: getAgendas(state),
})

const actionCreators = {
  push,
  fetchAgendas,
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);
