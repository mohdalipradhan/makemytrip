import React, { useContext, useState } from 'react'
import ScrollNavBar from '../../../ScrollNavBar/ScrollNavBar';
import Footer from '../../Footer/Footer';
import ModalTrainTest from '../ModalTrainTest/ModalTrainTest';
import { AuthContext, trainModalTestContext } from '../../App';
import { useLocation } from 'react-router-dom';

function PaymentTrain() {
    const [isValid, setIsValid] = useState(false);
    const { modalTrain, setModalTrain } = useContext(trainModalTestContext);

    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('')
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext)


    const location = useLocation();
    console.log(location);

  //End of the api _________

    //This one is for formatting card details

    const formatCreditCardNumber = (input) => {
        // Remove non-digit characters
        const digitsOnly = input.replace(/[^\d]/g, '');

        // Insert hyphens after every 4 digits
        const formattedNumber = (digitsOnly.match(/.{1,4}/g) || [])
            .join('-')
            .substr(0, 19);

        return formattedNumber;
    };

    const handleCardNumberChange = (e) => {
        const input = e.target.value;
        const formattedNumber = formatCreditCardNumber(input);
        setCreditCardNumber(formattedNumber);

        const pattern = /\b\d{4}[-,]\d{4}[-,]\d{4}[-,]\d{4}\b/;
        setIsValid(pattern.test(formattedNumber));
    };
    //ends here 

    //This one is formatting expiry
    function formatExpiryDate(input) {
        const digitsOnly = input.replace(/[^\d]/g, '');

        // Insert a "/" after the first 2 digits
        const formattedDate = digitsOnly
            .replace(/(\d{2})(?=\d)/, '$1/')
            .substr(0, 5);

        return formattedDate;
    }

    function handleExpiryDateChange(event) {
        const input = event.target.value;
        const formattedDate = formatExpiryDate(input);
        setExpiryDate(formattedDate)
    }
    //Ends here 
    const [CVV, setCVV] = useState('');

    //cvv change starts here 
    function formatCV(input) {
        const digitsOnly = input.replace(/[^\d]/g, '');

        // Limit the CVV to 3 digits
        const formattedCVV = digitsOnly.substr(0, 3);

        return formattedCVV;
    }

    function handleCvvChange(event) {
        const input = event.target.value;
        const formattedCVV = formatCV(input)
        setCVV(formattedCVV);
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log("hello");
        setModalTrain(true)
    }

    return (
        <>
            <ScrollNavBar />
            <div className='payment-container'>
                <div class="payment-method">
                    <form className='form-parent-just' onSubmit={handleSubmit}>
                        <h2 className='payment-method-h2'>Payment Method</h2>

                        <div class="form-group">
                            <label for="fullName">Full Name</label>
                            <input className="hotelInput" type="text" id="fullName" placeholder="Name On Card" required />
                        </div>

                        <div class="form-group">
                            <label for="email">Email</label>
                            <input className="hotelInput" type="email" id="fullName" placeholder="Email" required />
                        </div>

                        <div class="form-group">
                            <label for="cardNumber">Card Number</label>
                            <input onChange={handleCardNumberChange} className="hotelInput" type="text" id="cardNumber" placeholder="Card Number" value={creditCardNumber} required />
                        </div>

                        <div class="expiry-cvv">
                            <div class="form-group">
                                <label for="expiry">Expiry</label>
                                <input value={expiryDate} className="hotelInput" type="text" id="expiry" placeholder="MM/YY" onChange={handleExpiryDateChange} required />
                            </div>

                            <div class="form-group">
                                <label for="cvv">CVV</label>
                                <input 
                                onChange={handleCvvChange}
                                className="hotelInput" type="text" id="cvv" placeholder="CVV" value={CVV} required />
                            </div>
                        </div>
                        <button className='hote-book-btn' type="submit">Submit Payment</button>                       
                         </form>
                </div>
            </div>
            <ModalTrainTest  location = {location}/>
            <Footer />
        </>
    )
}

export default PaymentTrain
