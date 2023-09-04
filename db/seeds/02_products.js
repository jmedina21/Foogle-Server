/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('products').del();
  await knex('products').insert([
    { 
      id: 1,
      user_id: 1,
      title: "The Legend of Zelda Tears of the Kingdom Collector's Edition and CRIS",
      price: "$120",
      image: "https://images.craigslist.org/00R0R_10l8wEIjJey_0aT0ew_300x300.jpg",
      link: "https://newyork.craigslist.org/mnh/vgm/d/new-york-the-legend-of-zelda-tears-of/7662231096.html",
      location: "Midtown"
  },
  { 
      id: 2,
      user_id: 2,
      title: "Nintendo Switch Console - Animal Crossing: New Horizons Edition",
      price: "$225",
      image: null,
      link: "https://newyork.craigslist.org/mnh/vgm/d/new-york-nintendo-switch-console-animal/7656207423.html",
      location: "Nolita / Bowery"
  },
  { 
      id: 3,
      user_id: 3,
      title: "nintendo switch zelda oled totk console 2 games 1 controller for sale",
      price: "$500",
      image: "https://images.craigslist.org/00J0J_3T2xpKEPstT_0t20CI_300x300.jpg",
      link: "https://newyork.craigslist.org/mnh/vgm/d/new-york-nintendo-switch-zelda-oled/7660457904.html",
      location: "Midtown"
  },
  { 
      id: 4,
      user_id: 1,
      title: "nintendo switch bundle #5 2 games and wired controller for sale",
      price: "$400",
      image: "https://images.craigslist.org/00L0L_d0RmzUg8uzR_0t20CI_300x300.jpg",
      link: "https://newyork.craigslist.org/mnh/vgm/d/new-york-nintendo-switch-bundle-2-games/7660457849.html",
      location: "Midtown"
  },
  { 
      id: 5,
      user_id: 2,
      title: "nintendo switch (bundle #4) wired mario controller. 1 game for sale",
      price: "$450",
      image: "https://images.craigslist.org/00n0n_8hBl6MSxxEL_0t20CI_300x300.jpg",
      link: "https://newyork.craigslist.org/mnh/vgm/d/new-york-nintendo-switch-bundle-wired/7660457789.html",
      location: "Midtown"
  },
  ]);
};
      