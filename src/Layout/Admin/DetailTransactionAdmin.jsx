import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactionById } from "../../reducer/transactionSlice";
import Navbar from "../../components/General/Navbar";
import { useParams, Link } from "react-router-dom";

const DetailTransactionAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { transactionDetail } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactionById(id));
  }, [dispatch, id]);

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-5  bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        <div className="flex flex-col py-5 md:mx-10  text-lg text-white md:text-xl">
          <h1 className="text-2xl md:text-3xl mb-2 md:mb-5 md:mt-10">
            Detail Transaction
          </h1>
          {/* <h1>User Id : {id}</h1> */}
          {transactionDetail ? (
            <div className="grid grid-cols-1 md:grid-cols-3  shadow-lg  rounded-lg gap-x-10 md:py-5 ">
              <div className="flex flex-col md:mx-5 mb-5">
                <h1 className="text-2xl">Detai User</h1>
                <p className="">{`User Id : ${transactionDetail.userId}`}</p>
                <p>{`Payment Mehod : ${transactionDetail?.paymentMethodId}`}</p>
                <p>{`Invoice Id : ${transactionDetail?.invoiceId}`}</p>
                <p>{`Status : ${transactionDetail?.status}`}</p>
                <p>{`Total Amount : ${transactionDetail?.totalAmount}`}</p>
                <p>{`Poof Payment Url : ${transactionDetail?.proofPaymentUrl}`}</p>
                <p>{`Order date : ${transactionDetail?.orderDate}`}</p>
                <p>{`Created At : ${transactionDetail?.createdAt}`}</p>
                <p>{`Update At : ${transactionDetail?.updatedAt}`}</p>
              </div>
              <div className="flex flex-col mb-5">
                <h1 className="text-2xl">Payment Method</h1>
                <p>{`Payment method Id : ${transactionDetail?.payment_method?.id}`}</p>
                <p>{`Payment method Name : ${transactionDetail?.payment_method?.name}`}</p>
                <p>{`Virtual Account Number : ${transactionDetail?.payment_method?.virtual_account_number}`}</p>
                <p>{`Virtual Account Name : ${transactionDetail?.payment_method?.virtual_account_name}`}</p>
              </div>
              <div className="flex flex-col mb-5">
                {transactionDetail?.transaction_items?.map((item, index) => (
                  <div>
                    <h1 className=" text-2xl">Transaction Item</h1>
                    <img
                      key={index}
                      src={item.imageUrls[0]}
                      alt={`Image ${index}`}
                      className="w-32 h-32 object-cover"
                    />
                    <p>{`Transaction Item id : ${item?.id}`}</p>
                    <p>{`Title : ${item?.title}`}</p>
                    <p>{`Deskripsi : ${item?.description}`}</p>
                    <p>{`Price : ${formatToIDR(item?.price)}`}</p>
                    <p>{`Discount : ${formatToIDR(item?.price_discount)}`}</p>
                    <p>{`Quantity : ${item?.quantity}`}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No promo found.</p>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-5 text-white md:mx-10">
          <Link to={"/transaction-table"}>
            <button className="w-[200px] mt-1 mb-5 bg-blue-700 rounded-full md:w-[200px] flex items-center text-center justify-center p-1">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailTransactionAdmin;
