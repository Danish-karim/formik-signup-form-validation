import React from 'react';
import Select from 'react-select';

const DropList = ({ value, onChange, onBlur, options }) => {
  const handleChange = (value) => {
    onChange('topics', value);
  };
  const handleBlur = () => {
    onBlur('touched', true);
  };
  return (
    <Select
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      options={options}
      isMulti={true}
    />
  );
};
export default DropList;
