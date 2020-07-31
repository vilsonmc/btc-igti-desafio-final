import React, { useState, useEffect } from 'react';
import {
  deleteTransaction,
  findBYPeriod,
  updateTransaction,
  insertTransaction,
} from './service/ApiService';
import Header from './components/Header';
import Select from './components/Select';
import BarInfo from './components/BarInfo';
import InputSearch from './components/InputSearch';
import Transactions from './components/Transactions';
import PERIODS from './helpers/periods';
import ModalTransaction from './components/ModalTransaction';
import ChangeButtonSelect from './components/ChangeButtonSelect';
import Spinner from './components/Spinner';

export default function App() {
  const now = new Date();
  const [currentPeriod, setCurrentPeriod] = useState(
    `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
  );
  const [transactions, setTransactions] = useState([]);
  const [lancamentos, setLancamentos] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDisabled, setIsModalDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchPeriods = async () => {
      const res = await findBYPeriod(currentPeriod);
      const json = await res.data.transactions;
      setTransactions(json);
    };

    fetchPeriods();
  }, [currentPeriod]);

  useEffect(() => {
    if (filterText.trim() === '') {
      setFilteredTransactions([...transactions]);
    } else {
      const lowerCaseFilter = filterText.toLowerCase();

      const newFilteredTransactions = transactions.filter((transaction) => {
        return transaction.description.toLowerCase().includes(lowerCaseFilter);
      });
      setFilteredTransactions(newFilteredTransactions);
    }
  }, [filterText, transactions]);

  useEffect(() => {
    const newTransactions = Object.assign([], filteredTransactions);
    setLancamentos(newTransactions.length);
    setTotalReceitas(
      newTransactions.reduce((acc, curr) => {
        return acc + (curr.type === '+' ? curr.value : 0);
      }, 0)
    );
    setTotalDespesas(
      newTransactions.reduce((acc, curr) => {
        return acc + (curr.type === '-' ? curr.value : 0);
      }, 0)
    );
  }, [currentPeriod, filteredTransactions]);

  const handleSelectChange = (event) => {
    const newPeriod = event.target.value;
    setCurrentPeriod(newPeriod);
  };

  const handleClickPeriodButton = (value) => {
    const oldIndex = PERIODS.indexOf(currentPeriod);
    let newIndex;

    if (value === 'keyboard_arrow_right') {
      newIndex = oldIndex + 1;
    }
    if (value === 'keyboard_arrow_left') {
      newIndex = oldIndex - 1;
    }

    if (newIndex >= PERIODS.length || newIndex < 0) {
      newIndex = 0;
    }
    setCurrentPeriod(newIndex < 0 ? PERIODS[0] : PERIODS[newIndex]);
  };

  const handleDelete = async (id) => {
    const del = await deleteTransaction(id);

    if (del) {
      const res = await findBYPeriod(currentPeriod);
      const json = await res.data.transactions;
      const newTransactions = Object.assign([], json);
      setTransactions(newTransactions);
    }
  };
  const handleModalOpen = (transaction, title, disabled) => {
    setSelectedTransaction(transaction);
    setModalTitle(title);
    if (title.startsWith('Edição')) {
      disabled = true;
    }
    setIsModalDisabled(disabled);
    setIsModalOpen(true);
  };

  const handlePersist = (newTransaction, title, disabled) => {
    setSelectedTransaction(newTransaction);
    setModalTitle(title);
    setIsModalDisabled(disabled);
    setIsModalOpen(true);
  };

  const handlePersistData = async (newTransaction) => {
    const addTransaction = await insertTransaction(newTransaction);

    if (addTransaction) {
      const res = await findBYPeriod(currentPeriod);
      const json = await res.data.transactions;
      const newTransactions = Object.assign([], json);
      setTransactions(newTransactions);
      handleClose(false);
    }
  };

  const handleEditData = async (transaction) => {
    const updatedTransaction = await updateTransaction(
      transaction.id,
      transaction
    );

    if (updatedTransaction) {
      const res = await findBYPeriod(currentPeriod);
      const json = await res.data.transactions;
      const newTransactions = Object.assign([], json);
      setTransactions(newTransactions);
      handleClose(false);
    }
  };

  const handleFilterChange = (filteredText) => {
    setFilterText(filteredText);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <Header />
      <div className="center row" style={{ marginTop: '40px' }}>
        <div className="col s2 m2 l2">
          <ChangeButtonSelect
            icon="keyboard_arrow_left"
            onClick={handleClickPeriodButton}
          />
        </div>
        <div className="col s8 m8 l8">
          <Select
            currentPeriod={currentPeriod}
            periods={PERIODS}
            onSelectChange={handleSelectChange}
          />
        </div>
        <div className="col s2 m2 l2">
          <ChangeButtonSelect
            icon="keyboard_arrow_right"
            onClick={handleClickPeriodButton}
          />
        </div>
      </div>
      <BarInfo
        lancamentos={lancamentos}
        receitas={totalReceitas}
        despesas={totalDespesas}
        saldo={totalReceitas - totalDespesas}
      />
      <InputSearch
        filterText={filterText}
        onSave={handlePersist}
        title={modalTitle}
        disabled={isModalDisabled}
        transactions={transactions}
        onChange={handleFilterChange}
      />
      {lancamentos !== filteredTransactions.length && <Spinner />}
      {filteredTransactions.length > 0 && (
        <Transactions
          transactions={filteredTransactions}
          onDelete={handleDelete}
          onEdit={handleModalOpen}
        />
      )}
      {isModalOpen && (
        <ModalTransaction
          onSave={handlePersistData}
          onEdit={handleEditData}
          onClose={handleClose}
          selectedTransaction={selectedTransaction}
          title={modalTitle}
          disabled={isModalDisabled}
        />
      )}
    </div>
  );
}
