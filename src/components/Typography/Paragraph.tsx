import React from 'react';
import {StyleSheet, View} from 'react-native';
import Typography, {TypographyProps} from '.';

type ParagraphProps = TypographyProps;

const Paragraph: React.FC<ParagraphProps> = props => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.nested}>
        <Typography {...props}>{props.children}</Typography>
      </View>
    </View>
  );
};

export default Paragraph;

const styles = StyleSheet.create({
  wrapper: {flexDirection: 'row'},
  nested: {flex: 1},
});
