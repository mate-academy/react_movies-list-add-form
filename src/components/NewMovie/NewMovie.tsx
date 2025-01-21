import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onSubmit: (newMovie: Movie) => void;
};
export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const handleTitleChange = (title: string) => {
    setNewTitle(title); // Make sure the state is updated here
  };

  const [newDescription, setNewDescription] = useState('');
  const handleDescriptionChange = (description: string) => {
    setNewDescription(description); // Make sure the state is updated here
  };

  const [newImageURL, setNewImageURL] = useState('');
  const handleImageURLChange = (imageURL: string) => {
    setNewImageURL(imageURL); // Make sure the state is updated here
  };

  const [newImdbUrl, setNewImdbUrl] = useState('');
  const handleImdbUrlChange = (imdbUrl: string) => {
    setNewImdbUrl(imdbUrl); // Make sure the state is updated here
  };

  const [newImdbId, setNewImdbId] = useState('');
  const handleImdbIdChange = (imdbId: string) => {
    setNewImdbId(imdbId); // Make sure the state is updated here
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validation

    // Add the new movie to the movies list
    const newMovie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImageURL,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    // Call onSubmit from props to add the new movie
    onSubmit(newMovie);

    // Reset the form
    setNewTitle('');
    setNewDescription('');
    setNewImageURL('');
    setNewImdbUrl('');
    setNewImdbId('');

    // Increase the count to reset touched status of all the `Field`s
    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImageURL}
        onChange={handleImageURLChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!newTitle || !newImageURL || !newImdbUrl || !newImdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
