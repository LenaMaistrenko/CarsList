import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CarTable from './components/CarTable/CarTable';
import EditModal from './components/EditModal/EditModal';
import DeleteModal from './components/DaleteModal/DeleteModal';
import * as carApi from './api/carApi';

Modal.setAppElement('#root');

function App() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const data = await carApi.fetchCars();
      setCars(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = carId => {
    const updatedCars = cars.filter(car => car.id !== carId);
    console.log(updatedCars, carId);
    setCars(updatedCars);
    setDeleteModalIsOpen(false);
  };
  const handleEdit = updatedCar => {
    const updatedCars = cars.map(car =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setCars(updatedCars);
    setEditModalIsOpen(false);
  };

  const openEditModal = car => {
    setSelectedCar(car);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setSelectedCar(null);
    setEditModalIsOpen(false);
  };

  const openDeleteModal = car => {
    setSelectedCar(car);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCar(null);
    setDeleteModalIsOpen(false);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search"
      />
      <CarTable cars={cars} onEdit={openEditModal} onDelete={openDeleteModal} />

      {deleteModalIsOpen && (
        <DeleteModal
          car={selectedCar}
          onDelete={handleDelete}
          onCancel={closeDeleteModal}
        />
      )}
      {editModalIsOpen && (
        <EditModal
          car={selectedCar}
          onSave={handleEdit}
          onCancel={closeEditModal}
        />
      )}
    </div>
  );
}

export default App;
