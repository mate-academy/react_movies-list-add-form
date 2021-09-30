import { Component } from 'react';

import './NewMovie.scss';

const expression = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void;
};

type Errors = {
  [field: keyof Movie]: boolean
};

type State = {
  movie: Movie,
  error: Errors,
  requiredFields: string[],
  urlFields: string[],
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    error: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    requiredFields: ['title', 'imgUrl', 'imdbUrl', 'imdbId'],
    urlFields: ['imgUrl', 'imdbUrl'],
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd(this.state.movie);

    this.setState(state => ({
      ...state,
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    }));
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      movie: {
        ...state.movie,
        [name]: value,
      },
      error: {
        ...state.error,
        [name]: false,
      },
    }));
  };

  updateErrorStatus = (item: string) => {
    this.setState(state => ({
      ...state,
      error: {
        ...state.error,
        [item]: true,
      },
    }));
  };

  handleBlur = (event:React.FocusEvent<HTMLInputElement>) => {
    const item = event.target.name;

    if (this.state.requiredFields.includes(item)) {
      if (this.state.movie[item].length === 0) {
        this.updateErrorStatus(item);
      }
    }

    if (this.state.urlFields.includes(item)) {
      const regex = new RegExp(expression);

      if (!this.state.movie[item].match(regex)) {
        this.updateErrorStatus(item);
      }
    }
  };

  render() {
    const items = Object.keys(this.state.movie);

    const checkFormValidation = () => {
      return this.state.requiredFields.find(item => this.state.error[item]);
    };

    return (
      <form onSubmit={this.handleSubmit}>
        {items.map(item => (
          <div key={item}>
            <input
              type="text"
              className={this.state.error[item] ? 'field-with-error' : ''}
              name={item}
              value={this.state.movie[item]}
              placeholder={item}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
            <p className="form-error-message">
              {this.state.error[item] && 'failed field validation'}
            </p>
          </div>
        ))}
        <button
          type="submit"
          disabled={Boolean(checkFormValidation())}
        >
          Submit
        </button>
      </form>
    );
  }
}
