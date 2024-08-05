/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useState } from 'react';

interface NewMovieProps {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
}

const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formValues);
    setFormValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input
            type="text"
            name="imgUrl"
            value={formValues.imgUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          IMDB URL:
          <input
            type="text"
            name="imdbUrl"
            value={formValues.imdbUrl}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          IMDB ID:
          <input
            type="text"
            name="imdbId"
            value={formValues.imdbId}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default NewMovie;
