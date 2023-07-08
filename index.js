// ES 6 VARIANT
// import { sum } from "./LESSON 1/PART 1/import";

// CommonJS VARIANT
// const sum = require("./LESSON 1/PART 1/import");

// sum(1, 20);

const { nanoid } = require("nanoid");
const cars = require("./LESSON 1/PART 2/cars");

const invokeAction = async ({ action, id, brand, model, fuelType }) => {
  switch (action) {
    case "read":
      const allCars = await cars.getAllCars();
      return console.table(allCars);

    case "readById":
      const car = await cars.getById(id);
      return console.log(car);

    case "add":
      const newCar = await cars.add({ id, brand, model, fuelType });
      return console.log(newCar);

    case "updateById":
      const updatedCar = await cars.updateById(id, { brand, model, fuelType });
      return console.log(updatedCar ? updatedCar : null);

    case "deleteById":
      const deletedCar = await cars.deleteById(id);
      return console.log(deletedCar);

    default:
      return console.log(
        "Unknown action. Available actions: read, readById, add, updateById."
      );
  }
};

// invokeAction({ action: "read" });

// invokeAction({
//   action: "add",
//   id: nanoid(),
//   brand: "Lamborgini",
//   model: "Huraccan",
//   fuelType: "Diesel",
// });

// invokeAction({ action: "readById", id: "" });

// invokeAction({
//   action: "updateById",
//   id: "5XIs7q86bSmGfJH4r1ZLe",
//   brand: "zxcursed",
//   model: "SF666",
//   fuelType: "Beer",
// });

// invokeAction({ action: "deleteById", id: "" });
