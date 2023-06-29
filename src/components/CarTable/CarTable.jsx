import DeleteModal from 'components/DaleteModal/DeleteModal';
import EditModal from 'components/EditModal/EditModal';
import React, { useEffect, useState } from 'react';

const CarTable = ({ cars, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page of the table
  const [carsPerPage] = useState(25); // Number of cars per page
  const [searchTerm, setSearchTerm] = useState(''); // Search text
  const [selectedCar, setSelectedCar] = useState(null); // Selected car for editing/deleting

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  useEffect(() => {
    setCurrentPage(1);
  }, [cars]);
  const filteredCars = cars.filter(car => {
    return (
      (car.company &&
        car.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (car.model &&
        car.model.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (car.vin && car.vin.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (car.color &&
        car.color.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (car.year && car.year.toString().includes(searchTerm)) ||
      (car.price && car.price.toString().includes(searchTerm)) ||
      (car.availability === true &&
        'true'.includes(searchTerm.toLowerCase())) ||
      (Boolean(car.availability) === false &&
        'false'.includes(searchTerm.toLowerCase()))
    );
  });

  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  const handleDelete = carId => {
    onDelete(carId);
  };
  const handleEdit = car => {
    onEdit(car);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
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
          {currentCars.map(car => (
            <tr key={car.id}>
              <td>{car.car}</td>
              <td>{car.car_model}</td>
              <td>{car.car_vin}</td>
              <td>{car.car_color}</td>
              <td>{car.car_model_year}</td>
              <td>{car.price}</td>
              <td>{`${car.availability}`}</td>
              <td>
                <button type="button" onClick={() => handleEdit(car)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(car)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarTable;
