import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

type HeaderProps = React.PropsWithChildren<{}>;

const Header: React.FC<HeaderProps> = props => {
  return (
    <View style={styles.header}>
      <SafeAreaView />
      <View style={styles.nested}>{props.children}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    marginTop: 56,
  },
  nested: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
