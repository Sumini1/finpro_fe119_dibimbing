import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPaymentMethod } from "../../reducer/paymentMethodSlice";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const paymentMethods = useSelector((state) => state.paymentMethod.data);

  useEffect(() => {
    dispatch(fetchPaymentMethod());
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center gap-10 py-5 mx-auto">
      {paymentMethods.map((payment) => (
        <div key={payment.id}>
          <div className="grid gap-5">
            {/* <h2 >{payment.name}</h2> */}
            <img
              src={payment.imageUrl}
              alt={`${payment.name} logo`}
              style={{ width: "100px" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
