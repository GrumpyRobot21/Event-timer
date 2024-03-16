import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  font-family: 'Ojuju', sans-serif;
  text-align: center;
`;

const ModalTitle = styled.h2`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 0.5rem;

  ${({ primary }) =>
    primary &&
    `
    background-color: #007bff;
    color: #fff;
  `}

  ${({ secondary }) =>
    secondary &&
    `
    background-color: #ccc;
    color: #000;
  `}
`;

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Confirm Event Deletion</ModalTitle>
        <p>Are you sure you want to delete this event?</p>
        <div>
          <Button primary onClick={onConfirm}>
            Confirm
          </Button>
          <Button secondary onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DeleteConfirmationModal;