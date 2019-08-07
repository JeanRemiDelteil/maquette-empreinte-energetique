export const getActions = (state) => state.energyBalance.actions;

export const getBalance = (state) => state.energyBalance.balance;
export const getBalanceId = (balance) => (balance || {}).id;
