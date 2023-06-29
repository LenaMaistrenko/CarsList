import React from 'react';
import css from '../DaleteModal/DeleteModal.module.scss';

const DeleteModal = ({ car, onDelete, onCancel }) => {
  console.log(car);
  const handleDelete = () => {
    onDelete(car.id);
  };

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <h3>Delete Car</h3>
        <p>Are you sure you want to delete this car?</p>
        <p>
          <strong>Company:</strong> {car?.car}
        </p>
        <p>
          <strong>Model:</strong> {car?.car_model}
        </p>
        <p>
          <strong>VIN:</strong> {car?.car_vin}
        </p>
        <p>
          <em>This action cannot be undone.</em>
        </p>
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
