import React, { useState } from 'react';
import css from '../AddModal/AddModal.module.css';

const AddModal = ({ onAddCar, onCancel }) => {
  const [carData, setCarData] = useState({
    car: '',
    car_model: '',
    car_vin: '',
    car_color: '',
    car_model_year: '',
    price: '',
    availability: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setCarData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleCancel = () => {
    onCancel();
  };
  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateInputs(carData);
    if (Object.keys(errors).length === 0) {
      carData.price = `$${carData.price}`;
      onAddCar(carData);
      console.log(carData);
    } else {
      setValidationErrors(errors);
    }
  };

  const validateInputs = data => {
    const errors = {};

    if (data.car.trim() === '') {
      errors.car = 'Company is required';
    }
    if (data.car_model.trim() === '') {
      errors.car_model = 'Car Model is required';
    }
    if (data.car_vin.trim() === '') {
      errors.car_vin = 'Car VIN is required';
    }
    if (data.car_color.trim() === '') {
      errors.car_color = 'Car Color is required';
    }
    if (data.car_model_year.trim() === '') {
      errors.car_model_year = 'Car Model Year is required';
    }
    if (data.price.trim() === '') {
      errors.price = 'Price is required';
    }
    if (data.availability.trim() === '') {
      errors.availability = 'Availability is required';
    }

    return errors;
  };

  return (
    <div className={css.modal_container}>
      <div className={css.modal_content}>
        <h2>Add Car</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Company:
            <input
              type="text"
              name="car"
              value={carData.car}
              onChange={handleChange}
              placeholder="Enter car"
              pattern="[a-zA-Z0-9\s]+"
              title="Only letters, numbers, and spaces are allowed"
              required
            />
          </label>
          <br />
          <label>
            Model:
            <input
              type="text"
              name="car_model"
              value={carData.car_model}
              onChange={handleChange}
              placeholder="Enter car model"
              pattern="[a-zA-Z0-9\s]+"
              title="Only letters, numbers, and spaces are allowed"
              required
            />
          </label>
          <br />
          <label>
            VIN:
            <input
              type="text"
              name="car_vin"
              value={carData.car_vin}
              onChange={handleChange}
              placeholder="Enter car VIN"
              pattern="[A-HJ-NPR-Za-hj-npr-z0-9]{17}"
              title="Only letters, numbers, and spaces are allowed (length =17)"
              required
            />
          </label>
          <br />{' '}
          <label>
            Year:
            <input
              type="text"
              name="car_model_year"
              value={carData.car_model_year}
              onChange={handleChange}
              placeholder="Enter car model year"
              pattern="\d{4}"
              title="Only numbers are allowed"
              required
            />
          </label>
          <br />
          <label>
            Color:
            <input
              type="text"
              name="car_color"
              value={carData.car_color}
              onChange={handleChange}
              placeholder="Enter car color"
              pattern="[a-zA-Z0-9\s]+"
              title="Only letters, numbers, and spaces are allowed"
              required
            />
          </label>
          <br />
          <label>
            Price, $:
            <input
              type="text"
              name="price"
              value={carData.price}
              onChange={handleChange}
              placeholder="Enter price, $"
              pattern="[0-9.]+"
              title="Only numbers and decimal point are allowed"
              required
            />
          </label>
          <br />
          <label>
            Availability:
            <select
              name="availability"
              value={carData.availability}
              onChange={handleChange}
              required
            >
              <option value="">Select availability</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            {validationErrors.availability && (
              <span>{validationErrors.availability}</span>
            )}
          </label>
          <br />
          <button type="submit">Add</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
