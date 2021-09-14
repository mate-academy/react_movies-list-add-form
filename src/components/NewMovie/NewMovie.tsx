import {
  ChangeEventHandler,
  Component,
  FocusEventHandler,
  FormEventHandler,
} from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

interface State {
  title: [string, boolean];
  description: [string, boolean];
  imgUrl: [string, boolean];
  imdbUrl: [string, boolean];
  imdbId: [string, boolean];
}

const movieKeys: (keyof Movie)[] = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: ['', false],
    description: ['', false],
    imgUrl: ['', false],
    imdbUrl: ['', false],
    imdbId: ['', false],
  };

  handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof State;
    const value = event.target.value;

    this.setState(currentState => ({
      [name]: [value, currentState[name][1]],
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
      title: title[0],
      description: description[0],
      imgUrl: imgUrl[0],
      imdbUrl: imdbUrl[0],
      imdbId: imdbId[0],
    });
  };

  validateInput: FocusEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof State;
    const [value] = this.state[name];

    if (!value) {
      this.setState(currentState => ({
        [name]: [currentState[name][0], false],
      } as Pick<State, keyof State>));
    } else {
      this.setState(currentState => ({
        [name]: [currentState[name][0], true],
      } as Pick<State, keyof State>));
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
                  className="input"
                  id={key}
                  name={key}
                  type="text"
                  value={this.state[key][0]}
                  onChange={this.handleChange}
                  onBlur={this.validateInput}
                />
              </div>

              {
                !this.state[key][1] && <span>This field is required</span>
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
