export const getBalance = (state) => state.energyBalance.balance;
export const getBalanceId = (balance) => (balance || {}).id;
export const getBalanceInputs = (balance) => (balance || {}).inputs || [];
