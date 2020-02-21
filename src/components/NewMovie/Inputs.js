import React from 'react';
import PropTypes from 'prop-types';

export const Inputs = ({ inputs, handleChange, getState }) => (
  <>
    {inputs.map((item) => {
      switch (item.type) {
        case 'text':
          return (
            <input
              key={item.id}
              onChange={handleChange}
              value={getState(item.stateKey)}
              name={item.title}
              placeholder={item.title}
              type={item.type}
            />
          );

        case 'textarea':
          return (
            <textarea
              key={item.id}
              onChange={handleChange}
              value={getState(item.stateKey)}
              name={item.title}
              placeholder={item.title}
              type={item.type}
            />
          );

        default:
          return <></>;
      }
    })}
  </>
);

Inputs.propTypes = {
  getState: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    state: PropTypes.shape,
    id: PropTypes.number,
    type: PropTypes.string,
  })).isRequired,
};
