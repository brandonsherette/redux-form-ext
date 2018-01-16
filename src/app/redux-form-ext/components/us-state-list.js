import React from 'react';
import PropTypes from 'prop-types';
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
  name: 'Select State',
  value: ''
}];

states.forEach((state) => {
  options.push({
    name: state,
    value: state.substring(0,2) // state code
  });
});

const USStateList = (props) => (
  <SelectList label="State" {...props}  options={options}></SelectList>
);

USStateList.propTypes = {
  autoFocus: PropTypes.bool.isRequired,
  name: PropTypes.string,
  isLabelHidden: PropTypes.bool,
};

USStateList.defaultProps = {
  autoFocus: false,
  name: 'state',
  isLabelHidden: false,
};

export default USStateList;