import { useState } from 'react';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    reset,
    setValue,
    fields: {
      type,
      value,
      onChange,
    },
  };
};

export default useField;
