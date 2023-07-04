import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import CarTable from './components/CarTable/CarTable';
import EditModal from './components/EditModal/EditModal';
import DeleteModal from './components/DaleteModal/DeleteModal';
import AddModal from './components/AddModal/AddModal';
import Pagination from './components/Pagination/Pagination';
import * as carApi from './api/carApi';
import css from './App.module.css';
Modal.setAppElement('#root');

function App() {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(20);

  useEffect(() => {
    const storedCars = localStorage.getItem('carslocaldb');
    if (storedCars) {
      const parsedCars = JSON.parse(storedCars);
      setAllCars(parsedCars);
      setFilteredCars(parsedCars);
      setTotalCars(parsedCars.length);
    } else {
      fetchCars();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carslocaldb', JSON.stringify(allCars));
  }, [allCars]);

  useEffect(() => {
    const searchParams = searchQuery.toLowerCase().split(' ');

    const updatedCars = allCars.filter(car => {
      return searchParams.every(param => {
        return (
          (car.car && car.car.toLowerCase().includes(param)) ||
          (car.car_model && car.car_model.toLowerCase().includes(param)) ||
          (car.car_vin && car.car_vin.toLowerCase().includes(param)) ||
          (car.car_color && car.car_color.toLowerCase().includes(param)) ||
          (car.car_model_year &&
            car.car_model_year.toString().includes(param)) ||
          (car.price && car.price.toString().includes(param)) ||
          (car.availability === true && 'true'.includes(param)) ||
          (Boolean(car.availability) === false && 'false'.includes(param))
        );
      });
    });

    setFilteredCars(updatedCars);
    setTotalCars(updatedCars.length);
    setCurrentPage(1);
  }, [searchQuery, allCars]);

  const fetchCars = async () => {
    try {
      const data = await carApi.fetchCars();
      setAllCars(data);
      setFilteredCars(data);
      setTotalCars(data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = e => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = carId => {
    const updatedCars = allCars.filter(car => car.id !== carId);
    setAllCars(updatedCars);
    setFilteredCars(updatedCars);
    setTotalCars(totalCars - 1);
    setDeleteModalIsOpen(false);
  };

  const handleEdit = updatedCar => {
    const updatedCars = allCars.map(car =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setAllCars(updatedCars);
    setFilteredCars(updatedCars);
    setEditModalIsOpen(false);
  };

  const handleAddCar = newCar => {
    const updatedCars = [...allCars, newCar];
    setAllCars(updatedCars);
    setFilteredCars(updatedCars);
    setTotalCars(totalCars + 1);
    setAddModalIsOpen(false);
  };

  const openEditModal = car => {
    setSelectedCar(car);
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const openDeleteModal = carId => {
    const carToDelete = allCars.find(car => car.id === carId);
    setSelectedCar(carToDelete);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div>
      {' '}
      <div className={css.container_search_btn}>
        <label className={css.search_label}>
          {' '}
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="audi puce 1999"
            pattern="[a-zA-Z0-9.]*"
            title="Only letters, numbers, and spaces are allowed"
            className={css.search_input}
          />
        </label>
        <button type="button" className={css.btn_addcar} onClick={openAddModal}>
          Add car
        </button>
      </div>
      <CarTable
        cars={currentCars}
        onDelete={openDeleteModal}
        onEdit={openEditModal}
        currentPage={currentPage}
        carsPerPage={carsPerPage}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCars.length / carsPerPage)}
        onPageChange={handlePageChange}
      />
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
      {addModalIsOpen && (
        <AddModal onAddCar={handleAddCar} onCancel={closeAddModal} />
      )}
    </div>
  );
}

export default App;
