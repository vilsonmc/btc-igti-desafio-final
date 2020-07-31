const numberFormat = new Intl.NumberFormat('pt-BR');

const moneyFormat = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatNumber = (number) => {
  return numberFormat.format(number);
};

const formatMoney = (number) => {
  return moneyFormat.format(number);
};

export { formatNumber, formatMoney };
