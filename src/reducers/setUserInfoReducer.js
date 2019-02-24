export const setUserInfoReducer = (state = {userDate: '', elapsedDays: 0}, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      const { userDate, elapsedDays } = action;
      return { userDate, elapsedDays };
    default:
      return state;
  }
}