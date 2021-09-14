import {
  ChangeEventHandler,
  Component,
  FocusEventHandler,
  FormEventHandler,
} from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

interface StateProperty {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}

interface State {
  title: StateProperty;

  description: StateProperty;

  imgUrl: StateProperty;

  imdbUrl: StateProperty;

  imdbId: StateProperty;
}

const movieKeys: (keyof Movie)[] = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];
const urlValidator = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: {
      value: '',
      isValid: false,
      isTouched: false,
    },

    description: {
      value: '',
      isValid: false,
      isTouched: false,
    },

    imgUrl: {
      value: '',
      isValid: false,
      isTouched: false,
    },

    imdbUrl: {
      value: '',
      isValid: false,
      isTouched: false,
    },

    imdbId: {
      value: '',
      isValid: false,
      isTouched: false,
    },
  };

  handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof State;
    const value = event.target.value;

    this.setState(currentState => ({
      [name]: {
        value,
        isValid: currentState[name].isValid,
        isTouched: currentState[name].isTouched,
      },
    } as Pick<State, keyof State>));
  };

  handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { addMovie } = this.props;

    event.preventDefault();

    addMovie({
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    });
  };

  setInputInvalid = (name: keyof State) => {
    const { value } = this.state[name];

    this.setState(currentState => ({
      [name]: {
        value: currentState[name].value,
        isValid: !!value,
        isTouched: true,
      },
    } as Pick<State, keyof State>));
  };

  handleOnBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof State;
    const { value } = this.state[name];

    switch (name) {
      case 'title':
      case 'imdbId':
        this.setInputInvalid(name);
        break;

      case 'imdbUrl':
      case 'imgUrl':
        this.setInputInvalid(name);

        if (!urlValidator.test(value)) {
          this.setState(currentState => ({
            [name]: {
              value: currentState[name].value,
              isValid: false,
              isTouched: true,
            },
          } as Pick<State, keyof State>));
        }

        break;

      default:
        break;
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >

        {
          movieKeys.map(key => (
            <div className="field">
              <label htmlFor={key} className="label">{key}</label>
              <div className="control">
                <input
                  className={`input ${!this.state[key].isValid && this.state[key].isTouched ? 'is-danger' : ''}`}
                  id={key}
                  name={key}
                  type="text"
                  value={this.state[key].value}
                  onChange={this.handleChange}
                  onBlur={this.handleOnBlur}
                />
              </div>

              {
                !this.state[key].isValid
                && this.state[key].isTouched
                && (
                  <p className="help is-danger">
                    {`${key} is not valid`}
                  </p>
                )
              }
            </div>
          ))
        }

        <button
          type="submit"
          className="button is-link"
        >
          Add
        </button>
      </form>
    );
  }
}
