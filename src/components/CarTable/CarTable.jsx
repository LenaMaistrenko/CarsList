import React from 'react';
import css from './CarTable.module.css';

const CarTable = ({ cars, onDelete, onEdit, currentPage, carsPerPage }) => {
  const indexOfFirstCar = (currentPage - 1) * carsPerPage;

  return (
    <div className={css.carTable_container}>
      <table className={css.carTable_table}>
        <caption>CAR INFORMATION</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Model</th>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Price</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={car.id}>
              <td>{indexOfFirstCar + index + 1}</td>
              <td>{car.car}</td>
              <td>{car.car_model}</td>
              <td>{car.car_vin}</td>
              <td>{car.car_color}</td>
              <td>{car.car_model_year}</td>
              <td>{car.price}</td>
              <td>{car.availability.toString()}</td>
              <td>
                <div className={css.carTable_table_actions}>
                  <button
                    type="button"
                    className={css.carTable_table_actions_btn}
                    onClick={() => onEdit(car)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={css.carTable_table_actions_btn}
                    onClick={() => onDelete(car.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
