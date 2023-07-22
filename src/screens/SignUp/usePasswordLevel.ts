/* eslint-disable no-fallthrough */
import {useMemo} from 'react';

const REGEX_CONTAIN_AT_LEAST_UPPER_AND_LOWER =
  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
const REGEX_CONTAIN_AT_LEAST_ONE_DIGIT = /\d/;
const REGEX_CONTAIN_ALPHABET_CHARACTER_ONLY = /^[a-zA-Z0-9]*$/;

enum PasswordLevel {
  Weak = 'Weak',
  Fair = 'Fair',
  Good = 'Good',
  Strong = 'Strong',
}

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

    const lable =
      levelValue === 2
        ? PasswordLevel.Fair
        : levelValue === 3
        ? PasswordLevel.Good
        : levelValue === 4
        ? PasswordLevel.Strong
        : PasswordLevel.Weak;

    return {
      value: levelValue,
      lable,
    };
  }, [password]);

  return level;
};

export default usePasswordLevel;
