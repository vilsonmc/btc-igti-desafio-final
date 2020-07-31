import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalTransaction({
  onSave,
  onClose,
  onEdit,
  selectedTransaction,
  title,
  disabled,
}) {
  const [transactionValue, setTransactionValue] = useState(selectedTransaction);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(null);
    }
  };

  const handleModalClose = () => {
    onClose(null);
  };

  const handleTransactionChange = async (event) => {
    const { name, value } = event.target;
    setTransactionValue({ ...transactionValue, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (title === 'Edição de Lançamento') {
      const newTransaction = {
        id: transactionValue._id,
        description: transactionValue.description,
        value: transactionValue.value,
        category: transactionValue.category,
        year: transactionValue.yearMonthDay.substring(0, 4),
        month: transactionValue.yearMonthDay.substring(5, 7),
        day: transactionValue.yearMonthDay.substring(8),
        yearMonth: `${transactionValue.yearMonthDay.substring(
          0,
          4
        )}-${transactionValue.yearMonthDay.substring(5, 7)}`,
        yearMonthDay: transactionValue.yearMonthDay,
        type: transactionValue.type,
      };
      update(newTransaction);
    } else {
      const newTransaction = {
        description: transactionValue.description,
        value: transactionValue.value,
        category: transactionValue.category,
        year: transactionValue.yearMonthDay.substring(0, 4),
        month: transactionValue.yearMonthDay.substring(5, 7),
        day: transactionValue.yearMonthDay.substring(8),
        yearMonth: `${transactionValue.yearMonthDay.substring(
          0,
          4
        )}-${transactionValue.yearMonthDay.substring(5, 7)}`,
        yearMonthDay: transactionValue.yearMonthDay,
        type: transactionValue.type,
      };
      persist(newTransaction);
    }
  };

  const update = async (newTransaction) => {
    onEdit(newTransaction, title);
  };

  const persist = async (newTransaction) => {
    onSave(newTransaction, title);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div>
          <div style={styles.flexRow}>
            <span style={styles.title}>
              <strong>{title}</strong>
            </span>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="row" style={styles.radio}>
              <div className="input-field col s12 m6 l6">
                <p>
                  <label>
                    <input
                      id="iptRadioDespesa"
                      className="with-gap"
                      name="type"
                      type="radio"
                      value="-"
                      checked={transactionValue.type === '-' ? true : false}
                      onChange={handleTransactionChange}
                      disabled={disabled}
                    />
                    <span>Despesa</span>
                  </label>
                </p>
              </div>
              <div className="input-field col s12 m6 l6">
                <p>
                  <label>
                    <input
                      id="iptRadioReceita"
                      className="with-gap"
                      name="type"
                      type="radio"
                      value="+"
                      checked={transactionValue.type === '+' ? true : false}
                      onChange={handleTransactionChange}
                      disabled={disabled}
                    />
                    <span>Receita</span>
                  </label>
                </p>
              </div>
            </div>

            <div className="input-field col s12">
              <input
                id="iptDescription"
                type="text"
                name="description"
                value={transactionValue.description}
                onChange={handleTransactionChange}
              />
              <label className="active" htmlFor="iptDescription">
                Descrição
              </label>
            </div>
            <div className="input-field col s12">
              <input
                id="iptCategory"
                type="text"
                name="category"
                value={transactionValue.category}
                onChange={handleTransactionChange}
              />
              <label className="active" htmlFor="iptCategory">
                Categoria
              </label>
            </div>
            <div className="row">
              <div className="input-field col s12 m6 l6">
                <input
                  id="iptValue"
                  type="number"
                  name="value"
                  step="1.00"
                  value={transactionValue.value}
                  onChange={handleTransactionChange}
                />
                <label className="active" htmlFor="iptValue">
                  Valor
                </label>
              </div>
              <div className="input-field col s12 m6 l6">
                <input
                  id="iptDatePicker"
                  type="date"
                  name="yearMonthDay"
                  className="datepicker"
                  value={transactionValue.yearMonthDay}
                  onChange={handleTransactionChange}
                />
              </div>
            </div>
            <div className="row" style={{ textAlign: 'right' }}>
              <button
                id="btnSalvar"
                style={{ marginRight: '10px' }}
                className="waves-effect btn-small waves-light btn"
              >
                Salvar
              </button>
              <button
                className="waves-effect btn-small waves-light btn red dark-4"
                onClick={handleModalClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: '2.0rem',
    fontWeight: 'bold',
  },

  radio: {
    maxWidth: '300px',
  },
};
