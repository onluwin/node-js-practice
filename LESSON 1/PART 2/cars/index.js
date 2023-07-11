const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const getAllCars = async () => {
  const carsPath = path.join(__dirname, "cars.json");
  const data = await fs.readFile(carsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const carsPath = path.join(__dirname, "cars.json");
  const data = await fs.readFile(carsPath);
  const parsedCars = JSON.parse(data);
  return parsedCars.find((car) => car.id === id) || null;
};

const add = async (data) => {
  const cars = await getAllCars();

  const newCar = { ...data, id: nanoid() };

  cars.push(newCar);

  const carsPath = path.join(__dirname, "cars.json");

  fs.writeFile(carsPath, JSON.stringify(cars, null, 2));
  return newCar;
};

const updateById = async (id, updatedCar) => {
  const cars = await getAllCars();
  const index = cars.findIndex((car) => car.id === id);

  if (index === -1) {
    return null;
  }

  cars[index] = { id, ...updatedCar };

  const carsPath = path.join(__dirname, "cars.json");
  await fs.writeFile(carsPath, JSON.stringify(cars, null, 2));
  return cars[index];
};

const deleteById = async (id) => {
  console.log("id", id);
  console.log("typeof id", typeof id);
  const cars = await getAllCars();
  const index = cars.findIndex((car) => car.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedCar] = cars.splice(index, 1);

  const carsPath = path.join(__dirname, "cars.json");
  await fs.writeFile(carsPath, JSON.stringify(cars, null, 2));
  return deletedCar;
};

module.exports = { getAllCars, getById, add, updateById, deleteById };
