import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SearchableSelect(props) {
  const {
    options,
    value,
    handleChange,
    label,
    error,
    required,
    placeholder,
    helperText,
    disabled,
    disableClearable,
  } = props;

  const labelProp = props.labelProp ? props.labelProp : 'label';

  return (
    <Autocomplete
      value={value || null}
      options={options}
      disabled={disabled}
      getOptionLabel={(option) => option[labelProp]}
      style={props.style}
      onChange={(e, updatedValue) => {
        if (updatedValue) {
          handleChange(updatedValue);
        } else {
          handleChange(null);
        }
      }}
      disableClearable={disableClearable}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          required={required}
          placeholder={value ? '' : placeholder}
          label={label}
          error={!!error}
          helperText={error || helperText || null}
          fullWidth={props.fullWidth !== false}
        />
      )}
    />
  );
}
