import React from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom'

const formatHaxorzDate = (date) => moment(date).format('MMMM Do');

const Agenda = ({ agenda }) => (
  <div>
    <Link to={`/agendas/${agenda.id}`}>
      <h1>
        Haxorz {formatHaxorzDate(agenda.occurs_at)}
      </h1>
    </Link>
  </div>
);

export default Agenda;
