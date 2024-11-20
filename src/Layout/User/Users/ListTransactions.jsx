import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransaction } from "../../../reducer/transactionSlice";
import Navbar from "../../../components/General/Navbar";
import Footer from "../../../components/General/Footer";
import MyTransactions from "./MyTransactions";

const ListTransactions = () => {
  const transactions = useSelector(
    (state) => state.transaction.transactions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [dispatch]);


  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen p-1 py-1 text-lg bg-gradient-to-r from-blue-600  via-green-400 to-blue-600 md:p-10">
        <h1 className="text-white font-['Itim'] text-2xl md:text-4xl py-2 p-5">
          Transactions
        </h1>
        <div className="grid grid-cols-1 gap-3 md:gap-7 p-5 text-white md:grid-cols-3">
          {transactions.map((transactions) => (
            <div
              key={transactions.id}
              className="flex flex-col gap-1 shadow-lg h-[300px] rounded-md"
            >
              <div className="flex flex-col p-3">
                <h2 className="text-md md:mb-1">{`User Id : ${transactions?.userId}`}</h2>
                <h2 className="text-md md:mb-1">{`Invoice : ${transactions?.invoiceId}`}</h2>
                <p className="text-md md:mb-1">{`Transaction : ${transactions?.status}`}</p>
                {/* <p className="mb-1 text-lg">{`Total Amount : ${transaction?.totalAmount}`}</p> */}

                <p className=" text-md md:mb-1">{`Transaction : ${transactions?.payment_method?.name}`}</p>
                <p className="text-md md:mb-1">{`Virtual Account Number : ${transactions?.payment_method?.virtual_account_number}`}</p>
                <p className="text-md md:mb-1">{`Virtual Account Name : ${transactions?.payment_method?.virtual_account_name}`}</p>
                <img
                  src={transactions?.payment_method?.imageUrl}
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
