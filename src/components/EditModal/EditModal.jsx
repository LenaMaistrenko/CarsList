import React, { useState } from 'react';
import css from '../EditModal/EditModal.module.css';

const EditModal = ({ car, onSave, onCancel }) => {
  const [color, setColor] = useState(car.car_color);
  const [price, setPrice] = useState(car.price.slice(1));
  const [availability, setAvailability] = useState(car.availability);

  const handleSave = event => {
    event.preventDefault();
    const updatedCar = {
      ...car,
      car_color: color,
      price: `$${price}`,
      availability: availability,
    };
    console.log(updatedCar);
    onSave(updatedCar);
  };

  return (
    <div className={css.modal_container}>
      <div className={css.modal_content}>
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
              placeholder="Enter color"
              pattern="[a-zA-Z\s]+"
              title="Only letters"
              required
            />
          </label>{' '}
          <br />
          <label>
            Price, $:
            <input
              type="text"
              value={price}
              placeholder="Enter price, $"
              pattern="[0-9.]+"
              title="Only numbers and decimal point are allowed"
              required
              onChange={e => setPrice(e.target.value)}
            />
          </label>{' '}
          <br />
          <label>
            Availability:
            <select
              value={availability}
              onChange={e => setAvailability(e.target.value)}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </label>{' '}
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
