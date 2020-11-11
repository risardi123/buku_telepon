import React from "react"
import {Text as PureText, Platform} from "react-native"

const Text = props => {
  const customStyle = style => [
    props.size ? {fontSize: style.size} : null,
    props.color ? {color: style.color} : null,
    props.lineHeight ? {lineHeight: style.lineHeight} : null,
    props.marginTop ? {marginTop: style.marginTop} : null,
    props.marginBottom ? {marginBottom: style.marginBottom} : null,
    props.bold ? {fontWeight: Platform.OS === 'ios' ? "bold" : 'normal'} : null,
    props.center ? {textAlign: "center"} : null,
    props.right ? {textAlign: "right"} : null,
    props.fontWeight ? {fontWeight: style.fontWeight} : null,
    props.underline ? {textDecorationLine: "underline"} : null,
    props.letterSpacing ? {letterSpacing: style.letterSpacing} : null,
    props.marginHorizontal ? {marginHorizontal: style.marginHorizontal} : null
  ];

  return (
    <PureText
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      onPress={props.onPress}
      style={[
        {
          fontSize: 16,
          fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : (props.bold ? 'SfPro-Bold' : 'SfPro-Regular')
        },
        customStyle(props),
        props.style
      ]}>
      {props.children}
    </PureText>
  );
};

export default Text
