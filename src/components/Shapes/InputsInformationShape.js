import PropTypes from 'prop-types';

export const InputsInformationShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  imdbUrl: PropTypes.string.isRequired,
  imdbId: PropTypes.string.isRequired,
  inputs: PropTypes.shape({
    fieldTitle: PropTypes.string.isRequired,
    fieldDescription: PropTypes.string.isRequired,
    fieldImgUrl: PropTypes.string.isRequired,
    fieldImdbUrl: PropTypes.string.isRequired,
    fieldImdbId: PropTypes.string.isRequired,
  }).isRequired,
});
