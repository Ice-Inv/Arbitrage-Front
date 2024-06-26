import { useState } from 'react';
import { useTextFieldProps } from './types';

function getValidValue(value: string | number) {
  const strValue = String(value);

  if (strValue === 'null' || strValue === 'undefined' || strValue === 'NaN') {
    return ''
  }

  return strValue;
}

export function useTextField({
  initValue,
  regexp,
  errorText = '',
  isRequired = false,
}: useTextFieldProps) {
  const [value, setValue] = useState(getValidValue(initValue));
  const [error, setError] = useState('');

  const isValidated = errorText || isRequired;

  function onError(error: string = '') {
    setError(error ? error : errorText);
  }

  function onResetError() {
    setError('');
  }

  function onChange(newValue: string) {
    isValidated && setError('');

    if (!regexp) {
      setValue(newValue);
    }

    if (regexp?.test(newValue) || newValue === '') {
      setValue(newValue);
    }
  }

  function onReset() {
    setValue('');
    isValidated && setError('');
  }

  function onSetValue(value: string | number) {
    isValidated && setError('');

    const newValue = getValidValue(value);

    if (!regexp) {
      setValue(newValue);
    }

    if (regexp?.test(newValue) || newValue === '') {
      setValue(newValue);
    }
  }

  function getValidate(callbackFunc: () => boolean, error: string): boolean {
    if (isRequired && !value) {
      setError('Обязательное поле!');
      return false
    };

    if (!callbackFunc()) {
      setError(error || errorText || '');
      return false;
    }

    return true;
  }

  return [{value, onChange}, {error, onReset, onSetValue, onError, onResetError, getValidate}] as const
}