const RESTAURANTS_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING";

export async function fetchRestaurants() {
  const response = await fetch(RESTAURANTS_URL);

  if (!response.ok) {
    throw new Error(`Could not load restaurants (${response.status}).`);
  }

  const json = await response.json();
  const restaurants =
    json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants || [];

  return restaurants.map(({ info }) => ({
    id: info?.id,
    name: info?.name,
    rate: info?.avgRating,
    ratingCount: info?.totalRatingsString,
    price: info?.costForTwo,
    src: info?.cloudinaryImageId
      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`
      : "https://via.placeholder.com/300x200?text=No+Image",
    cuisines: info?.cuisines || [],
    locality: info?.locality,
    areaName: info?.areaName,
    deliveryTime: info?.sla?.deliveryTime,
    isVeg: info?.veg,
    offer: info?.aggregatedDiscountInfoV3,
  }));
}
