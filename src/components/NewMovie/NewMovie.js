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

  handleChange = (event, name) => {
    const { value } = event.target;
    const { newMovie } = this.state;

    const movie = {
      ...newMovie,
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
    const { newMovie } = this.state;

    this.setState((prevState) => {
      if (newMovie[name] === '') {
        return {
          errorMassage: {
            ...prevState.errorMassage,
            [name]: true,
          },
        };
      }

      if (newMovie[name] === '') {
        return {
          errorMassage: {
            ...prevState.errorMassage,
            [name]: true,
          },
        };
      }

      if (!pattern.test(newMovie.imgUrl)) {
        return {
          errorMassage: {
            ...prevState.errorMassage,
            imgUrl: true,
          },
        };
      }

      return {
        ...prevState,
      };
    });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { newMovie } = this.state;

    onAdd(newMovie);
    this.reset();
  }

  render() {
    const { errorMassage, newMovie } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
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
              onChange={(event, name) => this.handleChange(event, item.label)}
              name={item.label}
              type="text"
              className="form-control"
              id={item.label}
              value={newMovie[item.label]}
            />
            {errorMassage[item.label] && (
              <span className="badge badge-pill badge-danger">
                not valid value
              </span>
            )}
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
