import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransaction } from "../../../reducer/transactionSlice";
import Navbar from "../../../components/General/Navbar";
import Footer from "../../../components/General/Footer";

const ListTransactions = () => {
  const { transaction, status, error } = useSelector(
    (state) => state.transaction
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error || "Failed to fetch transactions"}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen p-1 py-1 text-lg bg-gradient-to-r from-blue-600  via-green-400 to-blue-600 md:p-10">
        <h1 className="text-white font-['Itim'] text-2xl md:text-4xl py-2 p-5">
          Transactions
        </h1>
        <div className="grid grid-cols-1 gap-3 md:gap-7 p-5 text-white md:grid-cols-3">
          {transaction.map((transaction) => (
            <div
              key={transaction.id}
              className="flex flex-col gap-1 shadow-lg h-[300px] rounded-md"
            >
              <div className="flex flex-col p-3">
                <h2 className="text-md md:mb-1">{`User Id : ${transaction?.userId}`}</h2>
                <h2 className="text-md md:mb-1">{`Invoice : ${transaction?.invoiceId}`}</h2>
                <p className="text-md md:mb-1">{`Transaction : ${transaction?.status}`}</p>
                {/* <p className="mb-1 text-lg">{`Total Amount : ${transaction?.totalAmount}`}</p> */}
                <p className=" text-md md:mb-1">{`Transaction : ${transaction?.payment_method?.name}`}</p>
                <p className="text-md md:mb-1">{`Virtual Account Number : ${transaction?.payment_method?.virtual_account_number}`}</p>
                <p className="text-md md:mb-1">{`Virtual Account Name : ${transaction?.payment_method?.virtual_account_name}`}</p>
                <img
                  src={transaction?.payment_method?.imageUrl}
                  alt=""
                  className="w-[100px] h-[100px] rounded-md -mt-5"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListTransactions;
