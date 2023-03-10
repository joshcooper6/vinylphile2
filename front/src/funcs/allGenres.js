// export default function allGenres(data) {
//   let genres = [];
//   data?.map((album, indx) => {
//     const filter = genres.filter((x) => x == album.metadata.genre);
//     const check = genres.includes(album.metadata.genre);
//     if (album.metadata.genre != undefined && filter.length <= 0 && !check) {
//       genres.push(album.metadata.genre);
//     }
//   });
//   return genres;
// }

export default function allGenres(data) {
  return data?.reduce((genres, album) => {
    if (album.metadata.genre && !genres.includes(album.metadata.genre.toLowerCase())) {
      genres.push(album.metadata.genre.toLowerCase());
    }
    return genres;
  }, []);
}

