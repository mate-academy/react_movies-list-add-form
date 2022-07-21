export const NewMovie = () => {
  return (
    <form className="NewMovie">
      <div className="field">
        <label className="label" htmlFor="title">
          Title
        </label>

        <div className="control">
          <input
            id="title"
            data-cy="movie-title"
            className="input is-danger" // is-danger means error
            type="text"
            placeholder="Enter a title"
          />
        </div>

        <p className="help is-danger">A title is required</p>
      </div>

      {/* Use the markup above and style the next fields */}
      <input type="text" data-cy="movie-description" />
      <input type="text" data-cy="movie-imgUrl" />
      <input type="text" data-cy="movie-imdbUrl" />
      <input type="text" data-cy="movie-imdbId" />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
