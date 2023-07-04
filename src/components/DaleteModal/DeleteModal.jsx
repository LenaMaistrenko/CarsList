import React from 'react';
import css from '../DaleteModal/DeleteModal.module.css';

const DeleteModal = ({ car, onDelete, onCancel }) => {
  const handleDelete = () => {
    onDelete(car.id);
  };

  return (
    <div className={css.modal_container}>
      <div className={css.modal_content}>
        <h2>Delete Car</h2>
        <p>Are you sure want to delete this car?</p>
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
          <em>You cannot undo this action.</em>
        </p>
        <div className={css.btn_container}>
          <button
            type="button"
            className={css.btn_delete}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button type="button" className={css.btn_cancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
