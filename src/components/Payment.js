import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../axios";
import { db } from "../firebase";
const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe(); // stripe.js
  const elements = useElements(); // stripe.js

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [processing, setProcessing] = useState(""); // 處理狀態
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");


  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
       console.log("response >>>> ",response);
    };
   
    getClientSecret();
  }, [basket]);



  console.log("The secret >>>>", clientSecret);
  console.log("USER: ", user);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); // 按下結帳鍵顯示處理中
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
         db.collection("users")
           .doc(user?.uid)
           .collection("orders")
           .doc(paymentIntent.id)
           .set({
             basket: basket,
             amount: paymentIntent.amount,
             created: paymentIntent.created,
           });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          //付款成功，清空購物籃
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    // 監聽使用者輸入卡號，並顯示錯誤當使用者輸入格式不對
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          您有 (<Link to="/checkout">{basket?.length}</Link>) 項商品
        </h1>
        {/* delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>收件地址</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>台灣 台南市</p>
            <p>幹你娘街 2486號</p>
          </div>
        </div>
        {/* review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>購買品項</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                rating={item.rating}
                price={item.price}
              />
            ))}
          </div>
        </div>
        {/* payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>付款方式</h3>
          </div>

          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        總額 ({basket.length} 項商品):
                        <strong>{value}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={3}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button className='Amazon__button' disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>處理中</p> : "結帳"}</span>
                </button>
                {/* Error */}
                {error && <div>{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
