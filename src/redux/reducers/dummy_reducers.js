const initial = {
  test_flag: false
}
export const dummy_reducers = (state= initial, action) => {
  switch (action.type) {
    case 'DUMMY_ON':
      return {
        ...state,
        test_flag: true
      }
    default:
      return state
  }
}

