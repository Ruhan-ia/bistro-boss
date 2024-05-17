import React from 'react';
import SectionTitle from '../../Component/SectionTitle/SectionTitle';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import useCart from '../../Hooks/useCart';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const [cart] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const price = parseFloat(total.toFixed(2))

    return (
        <div>
            <SectionTitle subHeading='Payment process' heading='Payment'></SectionTitle>
            <h2 className='text-4xl'>taka lgbe??</h2>
            
            <Elements stripe={stripePromise}>
      <CheckoutForm price={price}></CheckoutForm>
    </Elements>
        </div>
    );
};

export default Payment;