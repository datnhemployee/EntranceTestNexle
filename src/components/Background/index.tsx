import React from 'react';
import {Image, ImageProps, StyleSheet, useWindowDimensions} from 'react-native';

type BackgroundProps = ImageProps;

const Background: React.FC<BackgroundProps> = props => {
  const dimension = useWindowDimensions();
  const imageSize = Image.resolveAssetSource(props.source);
  const scaledHeight = (dimension.width / imageSize.width) * imageSize.height;

  return (
    <Image
      style={[styles.image, {height: scaledHeight}, props?.style]}
      {...props}
    />
  );
};

export default Background;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    resizeMode: 'stretch',
  },
});
