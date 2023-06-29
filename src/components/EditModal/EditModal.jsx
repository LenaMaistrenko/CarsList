import React, { useState } from 'react';
import css from '../EditModal/EditModal.module.scss';

const EditModal = ({ car, onSave, onCancel }) => {
  const [color, setColor] = useState(car.color);
  const [price, setPrice] = useState(car.price);
  const [availability, setAvailability] = useState(car.availability);

  const handleSave = event => {
    event.preventDefault();
    const updatedCar = {
      ...car,
      color: color,
      price: price,
      availability: availability,
    };
    onSave(updatedCar);
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h2>Edit Car</h2>
        <form onSubmit={handleSave}>
          <p>Company: {car.car}</p>
          <p>Model: {car.car_model}</p>
          <p>VIN: {car.car_vin}</p>
          <p>Year: {car.car_model_year}</p>
          <label>
            Color:
            <input
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </label>
          <label>
            Availability:
            <select
              value={availability}
              onChange={e => setAvailability(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>
          <button type="submit">Save</button>
          <button onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
