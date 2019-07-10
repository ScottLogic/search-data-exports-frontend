import { useState } from 'react';

export const useInputForm = initValue => {
  const [value, setValue] = useState(initValue);

  const handleValueChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleValueChange
  };
};
