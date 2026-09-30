import Res_Card from "./Res_Card.jsx";
import { useState, useEffect } from "react";
import Shammer from "./Shammer.jsx";
function Body() {
  let [res, setRes] = useState([]);
  let [searchText, setSearchText] = useState("");
  let [filteredRes, setFilteredRes] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [])
  const fetchData = async () => {
    try {
      const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING");
      const json = await data.json();
      console.log("Full API Response:", json);
  
      const restaurantData = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      
      console.log("Restaurant Data:", restaurantData);
      
     
      const transformedData = restaurantData.map((restaurant) => ({
        id: restaurant?.info?.id,
        name: restaurant?.info?.name,
        rate: restaurant?.info?.avgRating,
        price: restaurant?.info?.costForTwo,
        src: restaurant?.info?.cloudinaryImageId 
          ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${restaurant.info.cloudinaryImageId}` 
          : "https://via.placeholder.com/300x200?text=No+Image"
      }));
      
      console.log("Transformed Data:", transformedData);   
      setRes(transformedData);
      setFilteredRes(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if(!res || res.length === 0) {
    return <Shammer/>;
  }
  return (
    
    <div className="App-body">
         <div className="search">
        <input type="text" placeholder="Search for restaurants..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <button className="search-btn" onClick={(e) => {
          const filteredlist = res.filter((restaurant) => restaurant.name.toLowerCase().includes(searchText.toLowerCase()));
          setFilteredRes(filteredlist);
        }}>submit</button>
      </div>

        <button
        className="filter-btn"
        onClick={() => {
          const filteredlist = res.filter((restaurant) => restaurant.rate > 4);
          setRes(filteredlist);
        }}
      >
        Top Rated Restaurants
      </button>

<div className="restaurant-list">
  {filteredRes.map((restaurant) => (
    <Res_Card
      key={restaurant.id}
      name={restaurant.name}
      rate={restaurant.rate}
      price={restaurant.price}
      src1={restaurant.src}
    />
  ))}
</div>
```

    </div>
  )
}
export default Body;