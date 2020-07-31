import React from 'react';
//import M from 'materialize-css';

export default function Select({ currentPeriod, periods, onSelectChange }) {
  // const [currentPeriod, setCurrentPeriod] = React.useState(PERIODS[0]);
  // const [transactions, setTransactions] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchPeriods = async () => {
  //     const res = await api.get('transaction/period/' + currentPeriod);
  //     const json = await res.data.transactions;
  //     setTransactions(json);
  //   };

  //   fetchPeriods();
  // }, [currentPeriod]);

  // React.useEffect(() => {
  //   M.AutoInit();
  // }, []);

  // const handleSelectChange = (event) => {
  //   const newPeriod = event.target.value;
  //   setCurrentPeriod(newPeriod);
  //   //console.log(event.target);
  // };

  // const handleClickButton = (e) => {
  //   currentPeriod = currentPeriod - 1;
  // };

  return (
    <div>
      <select
        className="browser-default"
        style={{ height: '35px' }}
        value={currentPeriod}
        onChange={onSelectChange}
      >
        {periods.map((period) => {
          return (
            <option key={period} value={period}>
              {period}
            </option>
          );
        })}
      </select>
    </div>
  );
}

// const styles = {
//   flexRow: {
//     display: 'inline',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     maxWidth: '150px',
//   },
// };
