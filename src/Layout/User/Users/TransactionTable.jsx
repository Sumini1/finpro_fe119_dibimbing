import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransaction } from "../../../reducer/transactionSlice";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { transactions, status, error } = useSelector(
    (state) => state.transaction
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransaction = transactions.filter((transactions) =>
    transactions.userId
      ? transactions.userId.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-5 font-['Roboto Condensed'] text-md md:text-xl mx-5">
        Halaman Transactions
      </h1>

      <div className="grid grid-cols-1 p-2 mb-2 rounded-full md:grid-cols-2 md:rounded-lg md:items-center">
        <div className="flex w-full gap-2 p-2 mb-2 rounded-full bg-slate-100 md:mt-[5px] order-2 md:order-1">
          <CiSearch className="mx-5 mt-1" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-64 py-0 text-black rounded-full outline-none bg-slate-100"
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white ">
          <thead className="text-xs font-bold text-white uppercase bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                User Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTransaction.map((transactions, index) => (
              <tr
                key={transactions.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                    : "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                }`}
              >
                <th>
                  <p className="px-6 py-4">{index + 1}</p>
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {transactions?.userId}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-white ">
                  {transactions?.payment_method?.name}
                </th>
                <td className="px-6 py-4">{transactions?.status}</td>
                <td className="px-6 py-4">{transactions?.createdAt}</td>
                <td className="px-6 py-4">{transactions?.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/detail-transaction/${transactions?.id}`}>
                    <button className="font-medium text-white hover:underline">
                      Detail
                    </button>
                  </Link>

                  <button
                    className="font-medium text-white hover:underline"
                    // onClick={() => handleUpdateBanner(banner)}
                  >
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="grid grid-cols-3 gap-5 p-5">
        {isModalOpen && (
          <ModalCreateBanner
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}

        {isModalUpdateBanner && (
          <UpdateBanner
            isModalOpen={isModalUpdateBanner}
            toggleModal={handleUpdateBanner}
            bannerId={updateBanner?.id}
            banner={updateBanner}
          />
        )}
      </div> */}
    </div>
  );
};

export default TransactionTable;
