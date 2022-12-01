const board = [
  {
    date: "2022-12-01T10:41:30.775Z",
    developments: [],
    done: [],
    key: "1669891292161",
    queue: [
      { title: "new", date: "2022-12-01T10:41:34.772Z", id: "1669891296513" },

      {
        title: "one more",
        date: "2022-12-01T10:41:38.803Z",
        id: "1669891301007",
      },

      {
        title: "one more",
        date: "2022-12-01T10:41:40.743Z",
        id: "1669891301698",
      },

      {
        title: "and again",
        date: "2022-12-01T10:41:45.707Z",
        id: "1669891307635",
      },
    ],

    title: "second board",
  },
  {
    date: "2022-12-01T10:41:30.775Z",
    developments: [],
    done: [],
    key: "1669891292456",
    queue: [
      { title: "new", date: "2022-12-01T10:41:34.772Z", id: "166989129612312" },

      {
        title: "one more",
        date: "2022-12-01T10:41:38.803Z",
        id: "16698913011231",
      },

      {
        title: "one more",
        date: "2022-12-01T10:41:40.743Z",
        id: "1669891301121515",
      },

      {
        title: "and again",
        date: "2022-12-01T10:41:45.707Z",
        id: "166989130777",
      },
    ],

    title: "third board",
  },
];

const removeEl = (state, type, key) => {
  for (let i = 0; i < state.length; i++) {
    let result = state[i][type].filter((elem) => elem.id !== key)
    state[i][type] = result;
  }
  return state
};

console.log(removeEl(board, "queue", '16698913011231'));
