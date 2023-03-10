import styled from "styled-components";

const Front = styled.div`
  background-image: url(${(props) => props.img});
`;

export default function FlipAlbumCover(props) {
  const { showTracks, image, tracks } = props;

  return (
    <div className={`card ${showTracks && "flipTheCard"}`}>
      <div className={`content ${showTracks && "flipTheCard"}`}>
        <Front
          img={image}
          className={`front bg-cover bg-[url(${image})]`}
          children={``}
        />
        <div
          className={`back flex flex-col justify-center items-center bg-blue-900 ${
            showTracks ? "flipTheCard" : ""
          } `}
        >
          <div className={`overflow-scroll w-11/12 h-[95%]`}>
            {tracks?.split(",").map((track, index) => {
              return (
                <div
                  className="text-sm flex items-center gap-2"
                  key={`${track}_${index}`}
                >
                  <span className="font-light text-xs">{index + 1}</span>
                  <span>{track}</span>
                </div>
              );
            })}
            </div>
        </div>
      </div>
    </div>
  );
}
