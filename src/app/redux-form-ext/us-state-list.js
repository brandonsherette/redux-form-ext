import React, { PropTypes } from 'react';
import SelectList from './select-list';

const states = [
  "AK - Alaska",
  "AL - Alabama",
  "AR - Arkansas",
  "AZ - Arizona",
  "CA - California",
  "CO - Colorado",
  "CT - Connecticut",
  "DE - Delaware",
  "FL - Florida",
  "GA - Georgia",
  "GU - Guam",
  "HI - Hawaii",
  "IA - Iowa",
  "ID - Idaho",
  "IL - Illinois",
  "IN - Indiana",
  "KS - Kansas",
  "KY - Kentucky",
  "LA - Louisiana",
  "MA - Massachusetts",
  "MD - Maryland",
  "ME - Maine",
  "MI - Michigan",
  "MN - Minnesota",
  "MO - Missouri",
  "MS - Mississippi",
  "MT - Montana",
  "NC - North Carolina",
  "ND - North Dakota",
  "NE - Nebraska",
  "NH - New Hampshire",
  "NJ - New Jersey",
  "NM - New Mexico",
  "NV - Nevada",
  "NY - New York",
  "OH - Ohio",
  "OK - Oklahoma",
  "OR - Oregon",
  "PA - Pennsylvania",
  "RI - Rhode Island",
  "SC - South Carolina",
  "SD - South Dakota",
  "TN - Tennessee",
  "TX - Texas",
  "UT - Utah",
  "VA - Virginia",
  "VI - Virgin Islands",
  "VT - Vermont",
  "WA - Washington",
  "WI - Wisconsin",
  "WV - West Virginia",
  "WY - Wyoming"
];

const options = [{
  label: 'Select State',
  value: ''
}];

states.forEach((state) => {
  options.push({
    label: state,
    value: state.substring(0,2) // state code
  });
});

const USStateList = ({reduxFormChange}) => (
  <SelectList label="State" name="state" isLabelInline={false} reduxFormChange={reduxFormChange} options={options}></SelectList>
);

USStateList.propTypes = {
  reduxFormChange: PropTypes.func.isRequired
};

export default USStateList;