const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");

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

const add = async (newCar) => {
  const cars = await getAllCars();
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
