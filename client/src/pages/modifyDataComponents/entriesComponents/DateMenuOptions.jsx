import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';

const months = [
  "",
  "Janurary",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayList = [];
let yearList = [];

for (let i = 1; i <= 31; i++) {
  dayList.push(i);
}

const monthOptions = (months.map(option => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
)));

const dayOptions = (dayList.map(option => (
  <MenuItem key={option} value={option}>
    {option}
  </MenuItem>
)));


export {
  monthOptions,
  dayOptions,
};
