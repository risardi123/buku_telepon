const refresh_landing_reducers = (state= false, action) =>
{
  switch (action.type) {
    case 'REFRESH_LANDING_ON':
      return true
    case 'REFRESH_LANDING_OFF':
      return false
    default:
      return state
  }
}
export default refresh_landing_reducers
