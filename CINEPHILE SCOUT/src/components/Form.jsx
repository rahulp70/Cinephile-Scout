import React, { useState, useEffect } from "react";
import source from "../source";
import MOVIEAPPLICATION from "./MOVIEAPPLICATION.png";

function Form() {
  const [selectedValues, setSelectedValues] = useState({
    genre: "",
    region: "",
    ShowType: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Filter source data based on selected values and search query
    const filteredData = source.filter((item) => {
      const genreMatch =
        !selectedValues.genre ||
        selectedValues.genre === "All" ||
        item.genre === selectedValues.genre;
      const regionMatch =
        !selectedValues.region ||
        selectedValues.region === "All" ||
        item.region === selectedValues.region;
      const showTypeMatch =
        !selectedValues.ShowType ||
        selectedValues.ShowType === "All" ||
        item.ShowType === selectedValues.ShowType;
      const searchMatch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cast.some((castMember) =>
          castMember.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return genreMatch && regionMatch && showTypeMatch && searchMatch;
    });

    setFilteredData(filteredData);
  }, [selectedValues, searchQuery]);

  return (
    <div className="ALL">
      <div className="below-header">
        <div className="logo-container">
          <img src={MOVIEAPPLICATION} alt="logo" className="logo"></img>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍       Search "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="selectAll">
        <select
          className="select-option"
          id="Genre"
          onChange={(e) =>
            setSelectedValues({ ...selectedValues, genre: e.target.value })
          }
          value={selectedValues.genre}
        >
          <option value="" disabled selected>
            {" "}
            Genre
          </option>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Horror">Horror</option>
          <option value="Romantic">Romantic</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Cartoon">Cartoon</option>
        </select>

        <select
          className="select-option"
          id="Region"
          onChange={(e) =>
            setSelectedValues({ ...selectedValues, region: e.target.value })
          }
          value={selectedValues.region}
        >
          <option value="" disabled selected>
            Region
          </option>
          <option value="All">All</option>
          <option value="Anime">Anime</option>
          <option value="Bollywood">Bollywood</option>
          <option value="Hollywood">Hollywood</option>
          <option value="Korean">Korean</option>
        </select>

        <select
          className="select-option"
          id="ShowType"
          onChange={(e) =>
            setSelectedValues({ ...selectedValues, ShowType: e.target.value })
          }
          value={selectedValues.ShowType}
        >
          <option value="" disabled selected>
            ShowType
          </option>
          <option value="All">All</option>
          <option value="Movie">Movie</option>
          <option value="TV show">TV show</option>
        </select>
      </div>

      <div className="result-container">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="result-item">
              <div className="imageandinfo">
                <div className="img-name">
                  <h3 className="movieName">{item.name}</h3>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="result-image"
                  />
                </div>
                <div className="imbd">
                  <p className="imbd-rating">
                    <img
                      className="imbd_rating-icon"
                      src="https://img.icons8.com/?size=512&id=12246&format=png"
                      alt="imbd"
                    ></img>{" "}
                    :{item.imbd_rating}
                    <p className="trailer">Trailer:</p>
                    <img
                      className="youtube"
                      src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                      alt="youtube"
                      onClick={() => window.open(item.link, "_blank")}
                    />
                  </p>
                </div>
              </div>

              <div className="result_info">
                <p className="genreName">
                  <span>
                    Genre<span> </span>:
                  </span>{" "}
                  {item.genre}
                </p>
                <p className="regionName">
                  <span>
                    Region<span> </span>:
                  </span>{" "}
                  {item.region}
                </p>
                <p className="showtypeName">
                  <span>
                    Show Type<span> </span>:
                  </span>{" "}
                  {item.ShowType}
                </p>
                <p className="releaseDate">
                  <span>
                    Release Date<span> </span>:
                  </span>{" "}
                  {item.release_date}
                </p>
                <p className="director">
                  <span>
                    Director<span> </span>:
                  </span>{" "}
                  {item.director}
                </p>
                <p className="cast">
                  <span>
                    Cast<span> </span>:
                  </span>{" "}
                  {item.cast.join(",")}
                </p>
              </div>

              <div className="result_info2">
                <p> {item.info}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Form;
