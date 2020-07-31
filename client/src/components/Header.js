import React from 'react';

export default function Header() {
  return (
    <div>
      <div style={styles.flexRow}>
        <h4>
          <strong>Bootcamp Full Stack - Desafio Final</strong>
        </h4>
      </div>
      <div style={styles.flexRow}>
        <h5>Controle Financeiro Pessoal</h5>
      </div>
    </div>
  );
}
const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5px',
    marginRight: '5px',
  },
};
