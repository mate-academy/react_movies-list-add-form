import { Component } from 'react';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = Record<string, string>;

// eslint-disable-next-line max-len
const urlCheck = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
const textCheck = /\w/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    showErrorId: '',
  };

  checkValue = (inputType: RegExp, currentValue: string, currentId: string) => {
    if (!inputType.test(currentValue)) {
      this.setState({
        showErrorId: currentId,
      });

      return;
    }

    if (this.state.showErrorId === currentId) {
      this.setState({
        showErrorId: '',
      });
    }
  };

  render() {
    const movieObj = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };
    const inputsArr = Object.keys(movieObj);

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!this.state.showErrorId) {
            this.props.onAdd(movieObj);
            this.setState({
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
              showErrorId: '',
            });
          }
        }}
      >
        {
          inputsArr.map(input => (
            <>
              <label htmlFor={input}>
                {input.slice(0, 1).toUpperCase() + input.slice(1)}
              </label>

              <input
                type="text"
                value={this.state[input]}
                id={input}
                className={this.state.showErrorId === input
                  ? 'ErrorInput' : ''}
                onChange={(event) => {
                  this.setState({
                    [input]: event.target.value,
                  });
                }}
                onBlur={(event) => {
                  if (event.target.value) {
                    if (input.toLowerCase().includes('url')) {
                      this
                        .checkValue(urlCheck, event.target.value, input);
                    } else {
                      this
                        .checkValue(textCheck, event.target.value, input);
                    }
                  }
                }}
                required={input !== 'description'}
                disabled={!!this.state.showErrorId
                  && this.state.showErrorId !== input}
              />

              <ErrorMsg
                currentErrorId={this.state.showErrorId}
                currentInput={input}
              />
            </>
          ))
        }

        <button
          type="submit"
          disabled={!!this.state.showErrorId}
        >
          Add
        </button>
      </form>
    );
  }
}
