import {useState} from 'react';

type SignUpForm = {
  email: string;
  password: string;
};
type SignUpErrors = Partial<{
  email: string;
  password: string;
}>;

const EMAIL_REGEX =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 18;

const useForm = () => {
  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [hasError, setHasError] = useState(false);

  const validateField = (key: keyof SignUpForm, value: string) => {
    switch (key) {
      case 'email':
        switch (true) {
          case !value:
            return 'The email is required';
          case !EMAIL_REGEX.test(value):
            return 'The email is not valid';
          default:
            return;
        }

      case 'password':
        switch (true) {
          case !value:
            return 'The password is required.';
          case value?.length < PASSWORD_MIN_LENGTH ||
            value?.length > PASSWORD_MAX_LENGTH:
            return 'The password must be between 6-18 characters.';
          default:
            return;
        }
    }
  };

  const onChangeAndValidate = (key: keyof SignUpForm) => (value: string) => {
    const nextForm = {...form, [key]: value};
    const nextErrors = Object.keys(nextForm).reduce((errs, nextKey) => {
      const errorKey = nextKey as keyof SignUpForm;
      const nextValue = nextForm[errorKey];
      const nextError = validateField(nextKey as keyof SignUpForm, nextValue);
      if (!nextError) {
        return errs;
      }
      return {...errs, [nextKey]: nextError};
    }, {});
    const nextHasError = !!Object.keys(nextErrors).length;

    setForm(nextForm);
    setErrors(nextErrors);
    setHasError(nextHasError);
  };

  return {form, errors, hasError, onChangeAndValidate};
};

export default useForm;
