const Images = props => {
  const { imageData, loadMoreImages } = props;
  return (
    <>
      {imageData.length > 0 && (
        <>
          <ul className="gallery">
            {imageData.map((value, index) => {
              return (
                <li key={index} className="gallery-item">
                  <a href={value.largeImageURL}>
                    <img src={value.largeImageURL} alt="" />
                  </a>
                </li>
              );
            })}
          </ul>
          <button className="loadMore" onClick={loadMoreImages}>
            Load More images
          </button>
        </>
      )}
    </>
  );
};

export default Images;
