export default function allGenres(data) {
  let genres = [];
  data?.map((album, indx) => {
    const filter = genres.filter((x) => x == album.metadata.genre.toLowerCase());
    const check = genres.includes(album.metadata.genre.toLowerCase());
    if (album.metadata.genre != undefined && filter.length <= 0 && !check) {
      genres.push(album.metadata.genre.toLowerCase());
    }
  });
  return genres;
}
