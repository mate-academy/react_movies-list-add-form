import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { InputState } from '../../types/InputState';

interface Props {
  onAdd: (movie: Movie) => void;
}

type State = {
  titleValue: string;
  imgUrlValue: string;
  imdbUrlValue: string;
  imdbIdValue: string;
  descrValue: string;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const initialValue = {
    titleValue: '',
    imgUrlValue: '',
    imdbUrlValue: '',
    imdbIdValue: '',
    descrValue: '',
  };

  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState<State>(initialValue);

  const { titleValue, imgUrlValue, imdbUrlValue, imdbIdValue, descrValue } =
    inputValue;

  const pattern =
    // eslint-disable-next-line
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const notAllInformationGathered = Object.entries(inputValue).some(
    ([key, value]) => {
      if (key === 'descrValue') {
        return false;
      }

      return value.length === 0;
    },
  );

  const resetInputState = () => {
    setInputValue(() => {
      return {
        titleValue: '',
        imgUrlValue: '',
        imdbUrlValue: '',
        imdbIdValue: '',
        descrValue: '',
      };
    });
  };

  const handlerInput = (value: string, key: keyof State) => {
    setInputValue(newState => {
      return { ...newState, [key]: value };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imgUrlValue.match(pattern) || !imdbUrlValue.match(pattern)) {
      return;
    }

    const newMovie = {
      title: titleValue,
      description: descrValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    onAdd(newMovie);

    resetInputState();

    setCount(prevState => prevState + 1);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={event => handleSubmit(event)}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={handlerInput}
        inputState={InputState.titleValue}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={descrValue}
        onChange={handlerInput}
        inputState={InputState.descrValue}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={handlerInput}
        inputState={InputState.imgUrlValue}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={handlerInput}
        inputState={InputState.imdbUrlValue}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={handlerInput}
        inputState={InputState.imdbIdValue}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            {...(notAllInformationGathered && { disabled: true })}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
