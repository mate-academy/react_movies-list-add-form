/* eslint-disable max-len */
import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    invalidFieldLength: false,
    invalidUrl: false,
  };

  updateState = (value, id) => {
    this.setState({
      [id]: value,
    });
  }

  throwError = (errorName, target) => {
    this.setState({ [errorName]: true });
    target.classList.add('invalid');
  }

  removeError = (errorName, target) => {
    this.setState({ [errorName]: false });
    target.classList.remove('invalid');
  }

  render() {
    const { invalidFieldLength, invalidUrl, ...rest } = this.state;
    const formFields = Object.keys(rest);

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
                value={this.state[field]}
                onChange={(e) => {
                  this.updateState(e.target.value, e.target.id);
                }}
                onBlur={(e) => {
                  if (e.target.name !== 'description' && e.target.value.length === 0) {
                    this.throwError('invalidFieldLength', e.target);

                    return;
                  }

                  this.removeError('invalidFieldLength', e.target);

                  if (e.target.name === 'imgUrl' || e.target.name === 'imdbUrl') {
                    if (!e.target.value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/)) {
                      this.throwError('invalidUrl', e.target);
                    }

                    return;
                  }

                  this.removeError('invalidUrl', e.target);
                }}
              />
            );
          })}
          <button
            type="submit"
            disabled={invalidFieldLength || invalidUrl}
          >
            Add a movie
          </button>
        </form>
        {invalidFieldLength && (
          <div className="notification notification_length">
            <h2>Empty field</h2>
          </div>
        )}
        {invalidUrl && (
          <div className="notification notification_url">
            <h2>Invalid url</h2>
          </div>
        )}
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
