/* eslint-disable no-fallthrough */
import {useMemo} from 'react';
import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import Colors from '../../../utils/colors';
import Typography from '../../../components/Typography';

enum Level {
  Weak = 'Weak',
  Fair = 'Fair',
  Good = 'Good',
  Strong = 'Strong',
}

type PasswordLevelProps = ViewProps & {
  level: Level;
};

const PasswordLevelLine: React.FC<PasswordLevelProps> = props => {
  const parsedProgress =
    props.level === Level.Fair
      ? 2
      : props.level === Level.Good
      ? 3
      : props.level === Level.Strong
      ? 4
      : 1;
  const parsedRest = 4 - parsedProgress;

  const colorProgress =
    props.level === Level.Fair
      ? Colors.WARNING
      : props.level === Level.Good
      ? Colors.PRIMARY
      : props.level === Level.Strong
      ? Colors.SUCCESS
      : Colors.ERROR;

  return (
    <View style={[styles.wrap, props.style]}>
      <View
        style={[
          styles.process,
          {flex: parsedProgress, borderBottomColor: colorProgress},
        ]}
      />
      <View style={[styles.rest, {flex: parsedRest}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {flexDirection: 'row'},
  process: {borderBottomColor: Colors.PRIMARY, borderBottomWidth: 1, flex: 1},
  rest: {borderBottomColor: Colors.SECONDARY, borderBottomWidth: 1, flex: 3},
});

type PasswordLevelTextProps = ViewProps & {
  level: Level;
};
const PasswordLevelText: React.FC<PasswordLevelTextProps> = props => {
  const color =
    props.level === Level.Fair
      ? Colors.WARNING
      : props.level === Level.Good
      ? Colors.PRIMARY
      : props.level === Level.Strong
      ? Colors.SUCCESS
      : Colors.ERROR;

  const text =
    props.level === Level.Fair
      ? 'Fair'
      : props.level === Level.Good
      ? 'Good'
      : props.level === Level.Strong
      ? 'Strong'
      : 'Weak';

  return (
    <Typography level="subscript" color={color}>
      {text}
    </Typography>
  );
};

const REGEX_CONTAIN_AT_LEAST_UPPER_AND_LOWER =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
const REGEX_CONTAIN_AT_LEAST_ONE_DIGIT = /\d/;
const REGEX_CONTAIN_ALPHABET_CHARACTER_ONLY = /^[a-zA-Z0-9]*$/;

const usePasswordLevel = (password: string) => {
  const level = useMemo(() => {
    let levelValue = 1;
    if (REGEX_CONTAIN_AT_LEAST_UPPER_AND_LOWER.test(password)) {
      levelValue += 1;
    }
    if (REGEX_CONTAIN_AT_LEAST_ONE_DIGIT.test(password)) {
      levelValue += 1;
    }
    if (REGEX_CONTAIN_ALPHABET_CHARACTER_ONLY.test(password) === false) {
      levelValue += 1;
    }

    switch (levelValue) {
      case 2:
        return Level.Fair;
      case 3:
        return Level.Good;
      case 4:
        return Level.Strong;
      case 1:
      default:
        return Level.Weak;
    }
  }, [password]);

  return level;
};

export {PasswordLevelLine, PasswordLevelText, usePasswordLevel};
