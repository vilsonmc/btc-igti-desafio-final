import React from 'react';
import { formatMoney } from '../helpers/utils';
import Action from './Action';

export default function Transactions({ transactions, onDelete, onEdit }) {
  const handleActionClick = (id, type) => {
    const transaction = transactions.find((data) => data._id === id);

    if (type === 'delete') {
      onDelete(id);
    }

    if (type === 'edit') {
      onEdit(transaction, 'Edição de Lançamento');
    }
  };

  return (
    <div className="container center">
      <table className="striped">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(({ _id, day, category, description, value }) => {
            return (
              <tr key={_id}>
                <td>{day.toString().padStart(2, '0')}</td>
                <td>{category}</td>
                <td>{description}</td>
                <td>{formatMoney(value)}</td>
                <td>
                  <Action
                    id={_id}
                    type="edit"
                    onActionClick={handleActionClick}
                  />
                  <Action
                    id={_id}
                    type="delete"
                    onActionClick={handleActionClick}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
