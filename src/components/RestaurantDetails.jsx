import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchRestaurants } from "../utils/restaurantData.js";

function RestaurantDetails() {
  const { id } = useParams();
  const location = useLocation();
  const stateRestaurant = location.state?.restaurant;
  const selectedRestaurant =
    String(stateRestaurant?.id) === id ? stateRestaurant : null;
  const [fetchedDetails, setFetchedDetails] = useState({
    id: null,
    restaurant: null,
    error: "",
  });
  const restaurant =
    selectedRestaurant ||
    (fetchedDetails.id === id ? fetchedDetails.restaurant : null);
  const error = fetchedDetails.id === id ? fetchedDetails.error : "";
  const loading = !restaurant && !error;

  useEffect(() => {
    if (selectedRestaurant) return;

    let cancelled = false;

    fetchRestaurants()
      .then((restaurants) => {
        if (cancelled) return;

        const matchingRestaurant = restaurants.find(
          (item) => String(item.id) === id
        );

        setFetchedDetails({
          id,
          restaurant: matchingRestaurant,
          error: matchingRestaurant
            ? ""
            : "Restaurant details could not be found.",
        });
      })
      .catch((fetchError) => {
        if (!cancelled) {
          console.error("Error fetching restaurant details:", fetchError);
          setFetchedDetails({
            id,
            restaurant: null,
            error: "Could not load restaurant details. Please try again.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id, selectedRestaurant]);

  if (loading) {
    return <p className="restaurant-details-message">Loading restaurant details...</p>;
  }

  if (error || !restaurant) {
    return (
      <main className="restaurant-details-message">
        <p>{error || "Restaurant details could not be found."}</p>
        <Link to="/">Back to restaurants</Link>
      </main>
    );
  }

  const locationName = [restaurant.locality, restaurant.areaName]
    .filter(Boolean)
    .join(", ");
  const discount = restaurant.offer
    ? [restaurant.offer.header, restaurant.offer.subHeader]
        .filter(Boolean)
        .join(" ")
    : "";

  return (
    <main className="restaurant-details">
      <Link className="restaurant-back-link" to="/">
        ← All restaurants
      </Link>
      <img
        className="restaurant-details-image"
        src={restaurant.src}
        alt={restaurant.name}
      />
      <section className="restaurant-details-content">
        <h1>{restaurant.name}</h1>
        {restaurant.cuisines.length > 0 && (
          <p className="restaurant-cuisines">
            {restaurant.cuisines.join(" • ")}
          </p>
        )}
        <div className="restaurant-details-grid">
          {restaurant.rate != null && (
            <p>
              <strong>Rating</strong>
              <span>★ {restaurant.rate}</span>
            </p>
          )}
          {restaurant.ratingCount && (
            <p>
              <strong>Reviews</strong>
              <span>{restaurant.ratingCount}</span>
            </p>
          )}
          {restaurant.price && (
            <p>
              <strong>Price</strong>
              <span>{restaurant.price}</span>
            </p>
          )}
          {restaurant.deliveryTime && (
            <p>
              <strong>Delivery time</strong>
              <span>{restaurant.deliveryTime} minutes</span>
            </p>
          )}
          {locationName && (
            <p>
              <strong>Location</strong>
              <span>{locationName}</span>
            </p>
          )}
          {restaurant.isVeg && (
            <p>
              <strong>Food type</strong>
              <span>Vegetarian</span>
            </p>
          )}
        </div>
        {discount && <p className="restaurant-offer">{discount}</p>}
      </section>
    </main>
  );
}

export default RestaurantDetails;
