import { Component } from 'react';

type Props = {
  addMovie: (title: string, description: string, imgUrl:
  string, imdbUrl: string, imdbId: string) => void;
};

type State = {
  inputs: string[],
  isSubmited: boolean,
  isValidUrl: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    inputs: ['', '', '', '', ''],
    isSubmited: false,
    isValidUrl: true,
  };

  validateForm = () => {
    const { inputs } = this.state;

    this.setState({
      isSubmited: true,
    });

    const pattern = new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i');

    // check is every field except description is filled

    if (inputs.every((el, i) => i === 1 || el.length > 0)) {
      // check for valid URL

      if (!pattern.test(inputs[2]) || !pattern.test(inputs[3])) {
        this.setState({ isValidUrl: false });

        return false;
      }

      return true;
    }

    return false;
  };

  render() {
    const { inputs, isSubmited, isValidUrl } = this.state;

    const items = ['title', 'description', 'imgUrl', 'imdbUrl', 'imdbId'];

    return (
      <form
        id="addMovieForm"
        onSubmit={(event) => {
          event.preventDefault();
          if (this.validateForm()) {
            this.props.addMovie(inputs[0], inputs[1], inputs[2], inputs[3], inputs[4]);

            this.setState({ isSubmited: false });
            const form: HTMLFormElement | null = document.querySelector('#addMovieForm');

            if (form) {
              form.reset();
            }
          }
        }}
      >
        {items.map((el, i) => (
          <>
            <input
              className="movie__input"
              type="text"
              name={el}
              placeholder={`Enter ${el}`}
              onChange={({ target }) => {
                this.setState(prev => {
                  const newAr = prev.inputs;

                  newAr[i] = target.value;

                  return { inputs: newAr, isSubmited: false, isValidUrl: true };
                });
              }}
            />
            <div
              className="warning"
              hidden={i === 1 ? true
                : !(inputs[i].trim().length < 1 && isSubmited)}
            >
              Please enter&nbsp;
              {el}
            </div>
          </>
        ))}
        <div
          className="warning"
          hidden={isValidUrl}
        >
          Image link and IMDB link should be valid URL addresses!
        </div>
        <button
          type="submit"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}
