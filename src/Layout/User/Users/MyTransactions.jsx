import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTransactions } from "../../../reducer/transactionSlice";
import Navbar from "../../../components/General/Navbar";
import Footer from "../../../components/General/Footer";
import ModalUpdateProof from "../../../components/Users/ModalUpdateProof";

const MyTransactions = () => {
  const dispatch = useDispatch();
  const myTransactions = useSelector(
    (state) => state.transaction.myTransactions
  );

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const toggleModalOpen = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalUpdateOpen(!isModalUpdateOpen);
  };

  useEffect(() => {
    dispatch(fetchMyTransactions());
  }, [dispatch]);

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="grid bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-700 text-white ">
        <h1 className="text-2xl mx-5 md:mx-10 md:text-3xl mt-5">
          My Transactions
        </h1>
        {myTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex flex-col p-5 text-lg order-2"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 mb-3 shadow-lg md:mx-10">
              {transaction?.transaction_items?.map((item) => (
                <div
                  key={item.id}
                  className="p-5 flex flex-col text-lg order-1"
                >
                  <p>{`Name Activity: ${item.title}`}</p>
                  <p>{`Description: ${item.description}`}</p>
                  <p>{`Price: ${formatToIDR(item.price)}`}</p>
                  <p>{`Discount: ${formatToIDR(item.price_discount)}`}</p>
                  <p>{`Quantity: ${item.quantity}`}</p>
                  <p >{`Proof Payment Url : ${transaction.proofPaymentUrl}`}</p>
                  <div className="flex">
                    <button
                      onClick={() => toggleModalOpen(transaction)}
                      className="bg-blue-700 p-1 mt-5 w-[100px] rounded-full"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isModalUpdateOpen && selectedTransaction && (
        <ModalUpdateProof
          toggleModalOpen={() => toggleModalOpen(null)}
          transactionId={selectedTransaction.id}
          selectedMethod={null}
        />
      )}
      <Footer />
    </div>
  );
};

export default MyTransactions;
