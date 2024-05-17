import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useEffect } from 'react';

const CheckoutForm = ({price}) => {
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const {user} = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const stripe =useStripe()
    const elements = useElements()

    useEffect(()=>{
      axiosSecure.post('/create-payment-intent', {price})
      .then(res =>{
        setClientSecret(res.data.clientSecret)
      })
    }, [])
    const handleSubmit = async (event) =>{
        event.preventDefault()
        if (!stripe || !elements) {
            
            return;
          }

          const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card
    })
    if(error){
        setCardError(error.message)
    }
    else{
        setCardError('')
        console.log('paymentMethod', paymentMethod)
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous',
            email:user?.email || 'anonymous'
          },
        },
      },
    );
    if(confirmError){
      console.log(confirmError)

    }
    console.log(paymentIntent)

    }
    return (
     <>
        <form className='w-2/3 m-8' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-outline btn-info btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
      {
        cardError && <p className='text-red-500'>{cardError}</p>
      }
     </>
    );
};

export default CheckoutForm;