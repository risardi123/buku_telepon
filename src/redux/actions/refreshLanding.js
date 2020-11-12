const refreshLandingOn = () =>{
  return{
    type: 'REFRESH_LANDING_ON'
  }
}
const refreshLandingOff = () =>{
  return {
    type: 'REFRESH_LANDING_OFF'
  }
}
export {
  refreshLandingOn,
  refreshLandingOff
}
