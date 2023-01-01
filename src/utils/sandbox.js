const removeEl = (state, type, key) => {
  for (let i = 0; i < state.length; i++) {
    let result = state[i][type].filter((elem) => elem.id !== key);
    state[i][type] = result;
  }
  return state;
};

// const actionToFnMap = {
//   ADD_BOARD: (state, payload) => {
//     if (payload) {
//       state.boards.push(payload);
//       return { ...state, boards: state.boards };
//     }
//   },
// };
