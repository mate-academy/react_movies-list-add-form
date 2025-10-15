export const isEmpty = (s: string) => s.trim() === '';

export const isDisabled = ({
  title,
  imgUrl,
  imdbUrl,
  imdbId,
}: {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}): boolean => {
  return (
    isEmpty(title) || isEmpty(imgUrl) || isEmpty(imdbUrl) || isEmpty(imdbId)
  );
};
