import React from 'react';

const restaurantsData = [
  {
    id: 1,
    name: "Tony's Pizzeria",
    desc: "Italian · Pizza · Pasta",
    rating: "4.6",
    time: "25–30 min",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Grill House",
    desc: "American · Burgers · Fries",
    rating: "4.4",
    time: "20–25 min",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Spice Route",
    desc: "Indian · Biryani · Curries",
    rating: "4.8",
    time: "30–40 min",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Sweet Tooth Bakery",
    desc: "Desserts · Cakes · Coffee",
    rating: "4.7",
    time: "15–20 min",
    img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Green Bowl",
    desc: "Healthy · Salads · Bowls",
    rating: "4.5",
    time: "20–25 min",
    img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Noodle Bar",
    desc: "Asian · Noodles · Dim Sum",
    rating: "4.3",
    time: "25–35 min",
    img: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1200&auto=format&fit=crop"
  }
];

const Restaurants = () => {
  return (
    <section className="section">
      <h2 className="section-title">Restaurants Near You</h2>
      <div className="food-grid">
        {restaurantsData.map(restaurant => (
          <div key={restaurant.id} className="card glass restaurant-card">
            <img src={restaurant.img} alt={restaurant.name} />
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.desc}</p>
              <div className="restaurant-meta">
                <span className="rating-pill">★ {restaurant.rating}</span>
                <span>{restaurant.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
