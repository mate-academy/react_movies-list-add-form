import PropTypes from 'prop-types';

export const NewMovieTypes = {
  listImdbId: PropTypes.arrayOf(
    PropTypes.string,
  ),
  onAdd: PropTypes.func,
};
