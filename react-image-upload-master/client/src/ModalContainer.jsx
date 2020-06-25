import React from 'react';
import './modal.css';
import Modal from './ModalComponent';

const ModalContainer =({closeModal, isModalOpen, image})=> {
	return (
		<div className="modalWrapper">
			<Modal
				isModalOpen={isModalOpen}
				closeModal={closeModal}
			>
				<img
					width="100%"
					className="modalImg"
					src={image}
					alt="img_alt"
				/>
				<button
					className="closeBtn"
					onClick={closeModal}
				>
					Close		
				</button>
			</Modal>
		</div>
	);
	}


export default ModalContainer;