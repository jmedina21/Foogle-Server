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
      title: "Samsung Galaxy S21 Ultra",
      image: "123.jpg",
      link: "https://google.com",
      price: "$999",
      location: "Los Angeles",
    },
    {
      id: 2,
      user_id: 2,
      title: "Sony WH-1000XM4 Wireless Headphones",
      image: "123.jpg",
      link: "https://google.com",
      price: "$349",
      location: "Miami",
    },
    {
      id: 3,
      user_id: 3,
      title: "Nintendo Switch OLED Model",
      image: "123.jpg",
      link: "https://google.com",
      price: "$150",
      location: "NYC",
    },
    {
      id: 4,
      user_id: 1,
      title: "Samsung Galaxy S21 Ultra",
      image: "123.jpg",
      link: "https://google.com",
      price: "$999",
      location: "Los Angeles",
    },
    {
      id: 5,
      user_id: 2,
      title: "Dyson V11 Torque Drive Vacuum Cleaner",
      image: "123.jpg",
      link: "https://google.com",
      price: "$1999",
      location: "Austin",
    },
    {
      id: 6,
      user_id: 3,
      title: "Apple Watch Series 6 (GPS, 40mm) - Blue Aluminum Case with Deep Navy Sport Band",
      image: "123.jpg",
      link: "https://google.com",
      price: "$450",
      location: "Brooklyn",
    }
  ]);
};
      