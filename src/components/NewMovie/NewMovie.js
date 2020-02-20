import React, { Component } from 'react';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const inputs = [
  {
    id: v4().substr(0, 3), label: 'title',
  },
  {
    id: v4().substr(0, 3), label: 'description',
  },
  {
    id: v4().substr(0, 3), label: 'imgUrl',
  },
  {
    id: v4().substr(0, 3), label: 'imdbUrl',
  },
  {
    id: v4().substr(0, 3), label: 'imdbId',
  },
];

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errorMassage: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleChange = (e, name) => {
    const { value } = e.target;

    const movie = {
      ...this.state.newMovie,
      [name]: value,
    };

    this.setState(prev => ({
      newMovie: movie,
      errorMassage: {
        ...prev.errorMassage,
        [name]: false,
      },
    }));
  };

  handleValidation = (name) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (this.state.newMovie[name] === '') {
      this.setState(prev => ({
        errorMassage: {
          ...prev.errorMassage,
          [name]: true,
        },
      }));
    }

    if (!pattern.test(this.state.newMovie.imgUrl)) {
      this.setState(prev => ({
        errorMassage: {
          ...prev.errorMassage,
          imgUrl: true,
        },
      }));
    }

    if (!pattern.test(this.state.newMovie.imdbUrl)) {
      this.setState(prev => ({
        errorMassage: {
          ...prev.errorMassage,
          imdbUrl: true,
        },
      }));
    }
  };

  reset = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  render() {
    const { onAdd } = this.props;
    const { newMovie, errorMassage } = this.state;

    return (
      <form
        onSubmit={(e,
          movie,
          func) => onAdd(e, newMovie, this.reset)}
      >
        {inputs.map(item => (
          <div key={item.id} className="form-group">
            <label
              htmlFor={item.label}
              className="form-label"
            >
              {item.label}
            </label>
            <input
              onBlur={name => this.handleValidation(item.label)}
              onChange={(e, name) => this.handleChange(e, item.label)}
              name={item.label}
              type="text"
              className="form-control"
              id={item.label}
              value={this.state.newMovie[item.label]}
            />
            {errorMassage[item.label]
            && (
              <span className="badge badge-pill badge-danger">
              not valid value
              </span>
            )
            }
          </div>
        ))
        }
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-success"
            disabled={Object.values(errorMassage).some(value => value === true)}
          >
            Add muvie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
