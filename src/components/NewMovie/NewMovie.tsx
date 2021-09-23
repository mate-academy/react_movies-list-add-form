import { Component } from 'react';

type Props = {
  addMovie: (title: string, description: string, imgUrl:
  string, imdbUrl: string, imdbId: string) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  validateForm = () => {
    if (Object.values(this.state).every((el, i) => i === 1 || el.length > 0)) {
      return true;
    }

    return false;
  };

  render() {
    const items = Object.keys(this.state);

    return (
      <form onSubmit={(event) => {
        event.preventDefault();
        if (this.validateForm()) {
          const {
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          } = this.state;

          this.props.addMovie(title, description, imgUrl, imdbUrl, imdbId);
        }
      }}
      >
        {items.map(el => (
          <>
            <input
              required={el !== 'description'}
              className="movie__input"
              type="text"
              name={el}
              placeholder={`Enter ${el}`}
              onChange={({ target }) => {
                this.setState({
                  [target.name]: target.value,
                } as Pick<State, keyof State>);
              }}
            />
            <div
              className="warning"
              hidden={el === 'description' ? true
                : !(this.state[el as keyof State].trim().length < 1)}
            >
              Please enter&nbsp;
              {el}
            </div>
          </>
        ))}

        <button type="submit">
          Add a new movie
        </button>
      </form>
    );
  }
}
