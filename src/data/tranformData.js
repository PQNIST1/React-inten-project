

export const normalizeStringForURL = (str) => {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const NormalizedMovieNames = (movies) => {
  const normalizedNames = movies.map(movie => ({
    movie: movie.object.name,
    name: normalizeStringForURL(movie.object.name),
  }));

  return normalizedNames;
};

export const findName = (movies, prama) => {
    const foundMovie = movies.find(movie => movie.name.toLowerCase() === prama.toLowerCase());
    return foundMovie.movie;
};
