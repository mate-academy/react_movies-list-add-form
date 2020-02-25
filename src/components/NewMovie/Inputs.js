import React from 'react';
import PropTypes from 'prop-types';

export const Inputs = ({ inputsFromServer, handleChange, state }) => (
  <>
    {inputsFromServer.map((item) => {
      switch (item.type) {
        case 'text':
          return (
            <input
              key={item.id}
              onChange={handleChange}
              value={state[item.stateKey]}
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
              value={state[item.stateKey]}
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
  state: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    imdbUrl: PropTypes.string,
    imdbId: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  inputsFromServer: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    state: PropTypes.shape,
    id: PropTypes.number,
    type: PropTypes.string,
  })).isRequired,
};
