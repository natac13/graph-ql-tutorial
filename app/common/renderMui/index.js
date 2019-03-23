import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const renderCheckbox = ({ input, label, name }) => (
  <FormControlLabel
    label={label}
    control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        name={name}
      />
    }
  />
);

export const renderInput = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    label={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderFormButtons = ({ submitLabel }) => (
  <React.Fragment>
    <Button variant="contained" color="primary" type="submit">
      {submitLabel}
    </Button>
    <Button variant="contained" type="button">
      Clear
    </Button>
  </React.Fragment>
);

// const renderRadioGroup = ({ label, input, ...rest }) => (
//   <FormControl component="fieldset" className={classes.formControl}>
//     <FormLabel component="legend">Gender</FormLabel>
//     <RadioGroup
//       aria-label="Gender"
//       name="gender1"
//       className={classes.group}
//       value={this.state.value}
//       onChange={this.handleChange}
//     >
//       <FormControlLabel value="female" control={<Radio />} label="Female" />
//       <FormControlLabel value="male" control={<Radio />} label="Male" />
//       <FormControlLabel value="other" control={<Radio />} label="Other" />
//       <FormControlLabel
//         value="disabled"
//         disabled
//         control={<Radio />}
//         label="(Disabled option)"
//       />
//     </RadioGroup>
//   </FormControl>
// );

// const renderSelectField = ({
//   input,
//   label,
//   meta: { touched, error },
//   children,
//   ...custom
// }) => (
//   <SelectField
//     floatingLabelText={label}
//     errorText={touched && error}
//     {...input}
//     onChange={(event, index, value) => input.onChange(value)}
//     children={children}
//     {...custom}
//   />
// );
