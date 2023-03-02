import {useRef, useState} from "react";

import style from './Checkout.module.css'

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkuot = props => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = event => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isFiveChars(enteredPostal);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalIsValid,
            city: enteredCityIsValid
        });

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

        if(!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        });
    };

  return (
      <form className={style.form} onSubmit={confirmHandler}>
          <div className={`${style.control} ${formInputsValidity.name ? '' : style.invalid}`}>
              <label htmlFor='name'>Your Name</label>
              <input type='text' id='name' ref={nameInputRef} />
              {!formInputsValidity.name && <p>Please enter a valid name!</p>}
          </div>
          <div className={`${style.control} ${formInputsValidity.street ? '' : style.invalid}`}>
              <label htmlFor='street'>Street</label>
              <input type='text' id='street' ref={streetInputRef} />
              {!formInputsValidity.name && <p>Please enter a valid street!</p>}
          </div>
          <div className={`${style.control} ${formInputsValidity.postalCode ? '' : style.invalid}`}>
              <label htmlFor='postal'>Postal Code</label>
              <input type='text' id='postal' ref={postalInputRef} />
              {!formInputsValidity.name && <p>Please enter a valid postal code!</p>}
          </div>
          <div className={`${style.control} ${formInputsValidity.city ? '' : style.invalid}`}>
              <label htmlFor='city'>City</label>
              <input type='text' id='city' ref={cityInputRef} />
              {!formInputsValidity.name && <p>Please enter a valid city!</p>}
          </div>
          <div className={style.actions}>
              <button type='button' onClick={props.onCancel}>Cancel</button>
              <button className={style.submit}>Confirm</button>
          </div>
      </form>
  );
};

export default Checkuot;