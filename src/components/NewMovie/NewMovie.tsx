import React, { Component } from 'react';
import './NewMovie.scss';

import cn from 'classnames';

const linkValidationRegEx = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  invalidInputs: string[],
  touchedInputs: string[],
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    invalidInputs: [],
    touchedInputs: [],
  };

  inputTextHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  inputValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (
      value.length === 0
      || (name.includes('Url') && !linkValidationRegEx.test(value))
    ) {
      this.setState(prevState => ({
        invalidInputs: prevState.invalidInputs.includes(name)
          ? prevState.invalidInputs
          : [...prevState.invalidInputs, name],
      }));
    } else {
      this.setState(prevState => ({
        invalidInputs: prevState.invalidInputs.filter(item => item !== name),
      }));
    }
  };

  addTouchedInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    if (!this.state.touchedInputs.includes(name)) {
      this.setState(prevState => ({
        touchedInputs: [...prevState.touchedInputs, name],
      }));
    }
  };

  submitButtonStatus = () => {
    const { invalidInputs, touchedInputs } = this.state;

    return !(!invalidInputs.length && touchedInputs.length === 4);
  };

  onSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      invalidInputs: [],
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      invalidInputs,
    } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler}>
        <p>Title</p>
        <input
          className={cn({ warning: invalidInputs.includes('title') })}
          type="text"
          name="title"
          value={title}
          onFocus={this.addTouchedInputs}
          onChange={this.inputTextHandler}
          onBlur={this.inputValidation}
        />
        {invalidInputs.includes('title') && (
          <span>Enter a title!</span>
        )}
        <p>imgUrl</p>
        <input
          className={cn({ warning: invalidInputs.includes('imgUrl') })}
          type="text"
          name="imgUrl"
          value={imgUrl}
          onFocus={this.addTouchedInputs}
          onChange={this.inputTextHandler}
          onBlur={this.inputValidation}
        />
        {(invalidInputs.includes('imgUrl')) && (
          <span>Invalid url!</span>
        )}
        <p>imdbUrl</p>
        <input
          className={cn({ warning: invalidInputs.includes('imdbUrl') })}
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onFocus={this.addTouchedInputs}
          onChange={this.inputTextHandler}
          onBlur={this.inputValidation}
        />
        {invalidInputs.includes('imdbUrl') && (
          <span>Invalid url!</span>
        )}
        <p>imdbId</p>
        <input
          className={cn({ warning: invalidInputs.includes('imdbId') })}
          type="text"
          name="imdbId"
          value={imdbId}
          onFocus={this.addTouchedInputs}
          onChange={this.inputTextHandler}
          onBlur={this.inputValidation}
          required
        />
        {invalidInputs.includes('imdbId') && (
          <span>Enter an imdbId!</span>
        )}
        <p>Description</p>
        <textarea
          className="description"
          name="description"
          id="description"
          value={description}
          onChange={this.inputTextHandler}
        />
        <div>
          <button
            disabled={this.submitButtonStatus()}
            type="submit"
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}
