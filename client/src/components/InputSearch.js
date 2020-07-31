import React from 'react';
import M from 'materialize-css';

export default function InputSearch({
  onSave,
  selectedTransaction,
  title,
  disabled,
  filterText,
  onChange,
}) {
  M.updateTextFields();

  const newTransaction = {
    description: '',
    value: 0,
    category: '',
    year: null,
    month: null,
    day: null,
    yearMonth: '',
    yearMonthDay: '',
    type: '',
  };

  const handleClickButton = () => {
    selectedTransaction = newTransaction;
    title = 'Inclusão de Lançamento';
    disabled = false;
    onSave(selectedTransaction, title, disabled);
  };

  const handleDescriptionChange = async (event) => {
    const userFilter = event.target.value;
    onChange(userFilter);
  };

  return (
    <div className="center">
      <div className="row" style={styles.flexRow}>
        <div className="col s12 m6 l3">
          <button
            className="btn btn-small waves-effect waves-light"
            style={{ zIndex: 0, height: '35px', marginBottom: 0 }}
            onClick={handleClickButton}
          >
            <i className="material-icons left">add</i>Novo Lançamento
          </button>
        </div>
        <div className="input-field col s12 m6 l9">
          <input
            id="filter"
            type="text"
            value={filterText}
            onChange={handleDescriptionChange}
          />
          <label className="active" htmlFor="filter">
            Filtro
          </label>
        </div>
      </div>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    justifyContent: 'left',
  },
};
