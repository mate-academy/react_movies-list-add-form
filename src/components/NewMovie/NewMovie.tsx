/* eslint-disable default-case */
import React, { useCallback, useState } from 'react';
import { simpleValidation, urlsValidation } from '../../heplers/validators';
import { ChangeEvent, InputConditions } from '../../types/customTypes';
//
import { Input } from '../Input/Input';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = React.memo(({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [inputConditions, setInputConditions] = useState<InputConditions>({
    title: null,
    imdbId: null,
    imgUrl: null,
    imdbUrl: null,
  });

  const reset = useCallback(() => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImgUrl('');
    setImdbUrl('');
    setInputConditions({
      title: null,
      imdbId: null,
      imgUrl: null,
      imdbUrl: null,
    });
  }, []);

  const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;

    switch (name) {
      case 'title':
        setInputConditions({
          ...inputConditions,
          title: simpleValidation(title),
        });
        break;
      case 'imdbId':
        setInputConditions({
          ...inputConditions,
          imdbId: simpleValidation(imdbId),
        });
        break;
      case 'imgUrl':
        setInputConditions({
          ...inputConditions,
          imgUrl: urlsValidation(imgUrl),
        });
        break;
      case 'imdbUrl':
        setInputConditions({
          ...inputConditions,
          imdbUrl: urlsValidation(imdbUrl),
        });
    }
  }, [title, imdbId, imgUrl, imdbUrl]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    onAdd(newMovie);
    reset();
  };

  const handleChange = useCallback((event: ChangeEvent) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'imdbId':
        setImdbId(value);
        break;
      case 'imgUrl':
        setImgUrl(value);
        break;
      case 'imdbUrl':
        setImdbUrl(value);
        break;
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="new-movie__form"
    >
      <Input
        name="title"
        value={title}
        onChange={handleChange}
        onblur={handleBlur}
        conditions={inputConditions}
      />
      <textarea
        className="new-movie__input"
        name="description"
        value={description}
        placeholder="description"
        onChange={handleChange}
      />
      <Input
        name="imdbId"
        value={imdbId}
        onChange={handleChange}
        onblur={handleBlur}
        conditions={inputConditions}
      />
      <Input
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        onblur={handleBlur}
        conditions={inputConditions}
      />
      <Input
        name="imdbUrl"
        value={imdbUrl}
        onChange={handleChange}
        onblur={handleBlur}
        conditions={inputConditions}
      />
      <button
        type="submit"
        disabled={Object.values(inputConditions).some(condition => condition === false
          || condition === null)}
        className="new-movie__button"
      >
        Add
      </button>
    </form>
  );
});
