import React, { useContext } from 'react'
import "./ModalTrainTest"
import { createPortal } from 'react-dom'
import { trainModalTestContext } from '../../App';

function ModalTrainTest(props) {

    const { modalTrain, setModalTrain } = useContext(trainModalTestContext);

    const {location} = props;

    console.log(location);

    function handleOverlay(event) {
        if (event.target === event.currentTarget) {
            setModalTrain(false);
        }
    }
    return createPortal(
        modalTrain &&
        <div className='booking-confirmed-modal-Parent' onClick={handleOverlay}>
            <div className="modal-content" >
                <h2>Booking Successful!</h2>
                <p>Your Train from {location?.state?.trainsingle?.source} to {location?.state?.trainsingle?.destination} has been booked.</p>
                <p>Ticket ID Carry It: {location?.state?.trainsingle?.trainNumber} </p>
              
            </div>
        </div>,
        document.querySelector(".modalTrainTest")
    )
}

export default ModalTrainTest
