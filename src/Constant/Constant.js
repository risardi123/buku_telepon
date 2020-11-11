import {
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

const {
  width: DeviceWidth,
  height: DeviceHeight
} = Dimensions.get('window')

//get proper toolbar height
const ios = Platform.OS === 'ios';
const isIphoneX = ios && (DeviceHeight === 812 || DeviceWidth === 812);
const iphoneXTopInset = 24;
const initToolbarHeight = ios ? 40 : 56;
const paddingTop = ios ? 18 : 0;
const topInset =  isIphoneX ? iphoneXTopInset : 0;
const ToolbarHeight = initToolbarHeight + topInset + paddingTop

const ButtonHeight = 48
const GlobalImageLarge = DeviceWidth - 170
const marginHorizontal = 16

const HeaderConfig = (isDark) =>
{
  Platform.OS !== 'ios' && StatusBar.setBackgroundColor( "transparent")
  Platform.OS !== 'ios' && StatusBar.setTranslucent(true)
  StatusBar.setBarStyle( isDark ? "dark-content" : "light-content")
  StatusBar.animated
}

const fetch_link = "https://simple-contact-crud.herokuapp.com/"

export{
  DeviceWidth,
  DeviceHeight,
  ToolbarHeight,
  marginHorizontal,
  ButtonHeight,
  GlobalImageLarge,
  topInset,
  HeaderConfig,
  fetch_link
}
