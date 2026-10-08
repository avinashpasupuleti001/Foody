
import Res_Card, { Rescardwithlabel } from "./Res_Card.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Shammer from "./Shammer.jsx";
import { fetchRestaurants } from "../utils/restaurantData.js";

const PromotedResCard = Rescardwithlabel(Res_Card);

function Body() {
  const [res, setRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRes, setFilteredRes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const restaurants = await fetchRestaurants();
        setRes(restaurants);
        setFilteredRes(restaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadRestaurants();
  }, []);

  if (res.length === 0) {
    return <Shammer />;
  }

  return (
    <div className="App-body">
      <div className="search">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="search-btn"
          onClick={() => {
            const filteredlist = res.filter((restaurant) =>
              restaurant.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
            );

            setFilteredRes(filteredlist);
          }}
        >
          Submit
        </button>
      </div>

      <button
        className="filter-btn"
        onClick={() => {
          const filteredlist = res.filter(
            (restaurant) => restaurant.rate > 4
          );

          setFilteredRes(filteredlist);
        }}
      >
        Top Rated Restaurants
      </button>

      <div className="restaurant-list">
        {filteredRes.map((restaurant) => (
          <PromotedResCard
            key={restaurant.id}
            onClick={() =>
              navigate(`/restaurant/${restaurant.id}`, {
                state: { restaurant },
              })
            }
            name={restaurant.name}
            rate={restaurant.rate}
            price={restaurant.price}
            src1={restaurant.src}
          />
        ))}
      </div>
    </div>
  );
}

export default Body;