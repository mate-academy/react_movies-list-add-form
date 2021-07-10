/* eslint-disable max-len */
import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    emptyField: '',
    invalidUrl: '',
  };

  updateState = (value, id) => {
    this.setState({
      [id]: value,
    });
  }

  render() {
    const { emptyField, invalidUrl, ...rest } = this.state;
    const formFields = Object.keys(rest);
    const validationRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return (
      <>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.onAdd(this.state);
          formFields.map(field => this.updateState('', field));
        }}
        >
          {formFields.map((field) => {
            return (
              <input
                type="text"
                required={field !== 'description'}
                id={field}
                placeholder={field}
                name={field}
                className={cn('', {
                  emptyField: emptyField === field,
                  invalidUrl: invalidUrl === field,
                })}
                value={this.state[field]}
                onChange={(e) => {
                  this.updateState(e.target.value, e.target.id);
                }}
                onBlur={(e) => {
                  if (e.target.value.length === 0 && field !== 'description') {
                    this.setState({ emptyField: field });

                    return;
                  }

                  this.setState({ emptyField: '' });

                  if (field === 'imgUrl' || field === 'imdbUrl') {
                    if (!e.target.value.match(validationRegex)) {
                      this.setState({ invalidUrl: field });

                      return;
                    }

                    this.setState({ invalidUrl: '' });
                  }
                }}
              />
            );
          })}
          <button
            type="submit"
            disabled={emptyField || invalidUrl}
          >
            Add a movie
          </button>
        </form>
        <div className="notifications">
          {emptyField && (
            <div className="notification">
              <h2>Error: empty field</h2>
            </div>
          )}
          {invalidUrl && (
            <div className="notification">
              <h2>Error: invalid URL</h2>
            </div>
          )}
        </div>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
