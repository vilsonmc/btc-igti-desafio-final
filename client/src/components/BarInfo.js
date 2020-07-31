import React from 'react';
import { formatMoney } from '../helpers/utils';

export default function BarInfo({ lancamentos, receitas, despesas, saldo }) {
  const saldoStyle = saldo > 0 ? styles.valorPositivo : styles.valorNegativo;

  return (
    <div className="center row" style={styles.divInfo}>
      <div
        className="col s12 m6 l3"
        style={{ fontWeight: 'bold', color: 'gray' }}
      >
        Lançamentos: {lancamentos}
      </div>
      <div className="col s12 m6 l3" style={styles.valorPositivo}>
        Receitas: {formatMoney(receitas)}
      </div>
      <div className="col s12 m6 l3" style={styles.valorNegativo}>
        Despesas: {formatMoney(despesas)}
      </div>
      <div className="col s12 m6 l3" style={saldoStyle}>
        Saldo: {formatMoney(saldo)}
      </div>
    </div>
  );
}

const styles = {
  divInfo: {
    border: '1px solid lightGray',
    marginRight: '5px',
    marginLeft: '5px',
    marginTop: '40px',
    marginBottom: '40px',
    paddingTop: '5px',
    paddingBottom: '5px',
    textAlign: 'left',
  },

  valorPositivo: {
    fontWeight: 'bold',
    color: '#26a69a',
  },
  valorNegativo: {
    fontWeight: 'bold',
    color: 'Red',
  },
};
