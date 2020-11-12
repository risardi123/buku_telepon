import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Text, Platform,
} from 'react-native';
import {ToolbarHeight} from '../../../Constant/Constant'
export default class Header extends React.PureComponent {

  constructor(props) {
    super(props);
    this.headerHeight = props.headerMaxHeight;
    this.state = {
      scrollOffset: new Animated.Value(0),
      left: 0,
      bottom: 0,
    };
  }

  onScroll = e => {
    if (this.props.disabled) {
      return;
    }
    this.state.scrollOffset.setValue(e.nativeEvent.contentOffset.y);
  };
  _getHeight = () => {
    const { scrollOffset } = this.state;
    return scrollOffset.interpolate({
      inputRange: [0, this.headerHeight - ToolbarHeight],
      outputRange: [this.headerHeight, ToolbarHeight],
      extrapolate: 'clamp',
    })
  }

  _getBottom = () => {
    const { scrollOffset } = this.state;
    const bottom = this.props.titleStyle.bottom || Header.defaultProps.titleStyle.bottom;
    return scrollOffset.interpolate({
      inputRange: [0, this.headerHeight - ToolbarHeight],
      outputRange: [bottom, this.state.bottom],
      extrapolate: 'clamp',
    });
  }

  _getOpacity = () => {
    const { scrollOffset } = this.state;
    return this.props.backText ? scrollOffset.interpolate({
      inputRange: [0, this.headerHeight - ToolbarHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }) : 0
  }
  _getReverseOpacity = () =>
  {
    const { scrollOffset } = this.state;
    return this.props.backText ? scrollOffset.interpolate({
      inputRange: [0, this.headerHeight - ToolbarHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }) : 0
  }
  _getImageOpacity = () => {
    const { scrollOffset } = this.state;
    return this.props.imageSource ? scrollOffset.interpolate({
      inputRange: [0, this.headerHeight - ToolbarHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }) : 0
  }

  _getImageScaleStyle = () => {
    if (!this.props.parallax) {
      return undefined;
    }
    const { scrollOffset } = this.state;
    const scale = scrollOffset.interpolate({
      inputRange: [-100, -0],
      outputRange: [1.5, 1],
      extrapolate: 'clamp',
    })

    return {
      transform: [
        {
          scale,
        }
      ]
    }
  }

  render() {
    const { imageSource, titleStyle, fontSizeTitle , titleColor} = this.props;
    const height = this._getHeight();
    const bottom = this._getBottom();
    const opacity = this._getOpacity();
    const reverseOpacity = this._getReverseOpacity()
    const imageOpacity = this._getImageOpacity();
    const headerStyle = this.props.noBorder ? undefined : { borderColor: '#a7a6ab'}

    return (
      <Animated.View
        style={[
          headerStyle,
          {
            height: height,
            backgroundColor: "#3C81C9",
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          },
        ]}>
        {imageSource && <Animated.Image
          style={[StyleSheet.absoluteFill, {width: null, height: null, opacity: imageOpacity}, this._getImageScaleStyle()]}
          source={imageSource}
          resizeMode='cover'
        />}
        <View style={{height: ToolbarHeight}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 9}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems : 'flex-start'}}>
              {this.props.renderLeft && this.props.renderLeft()}
            </View>
            <Animated.Text style={{opacity: reverseOpacity, textAlign: 'center',flex: 2,fontSize: fontSizeTitle,
              color: titleColor, fontWeight: 'bold',
              fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'SfPro-Bold'}}>
              {this.props.title}
            </Animated.Text>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
              {this.props.renderRight && this.props.renderRight()}
            </View>
          </View>
        </View>
        <Animated.Text style={[titleStyle, {
          position: 'absolute',
          opacity: opacity,
          bottom: bottom,
          color: titleColor,
          fontSize: 32,
          fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'SfPro-Bold',
          fontWeight: 'bold'
        }]}>
          {this.props.title}
        </Animated.Text>
      </Animated.View>
    );
  }
}

Header.defaultProps = {
  backText: '',
  title: '',
  renderLeft: undefined,
  renderRight: undefined,
  backStyle: { marginLeft: 10 },
  backTextStyle: { fontSize: 16 },
  titleStyle: { fontSize: 20, left: 40, bottom: 30 },
  toolbarColor: '#FFF',
  headerMaxHeight: 200,
  disabled: false,
  imageSource: undefined,

  fontSizeTitle: 17,
  titleColor: "#FFF"
}
