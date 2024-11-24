import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransaction } from "../../../reducer/transactionSlice";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import ModalupdateStatus from "../../../components/Users/ModalUpdateStatus";

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { transactions, status, error } = useSelector(
    (state) => state.transaction
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Filter transaksi berdasarkan query pencarian
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.transaction_items?.some((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Menghitung total halaman
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  // Data untuk halaman saat ini
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Fungsi untuk berpindah halaman

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

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

      {/* Input Pencarian */}
      <div className="grid grid-cols-1 p-2 mb-2 rounded-full md:grid-cols-2 md:rounded-lg md:items-center">
        <div className="flex w-full gap-2 p-2 mb-2 rounded-full bg-slate-100 md:mt-[5px] order-2 md:order-1">
          <CiSearch className="mx-5 mt-1" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama activity..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-64 py-0 text-black rounded-full outline-none bg-slate-100"
          />
        </div>
      </div>

      {/* Tabel Transaksi */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white ">
          <thead className="text-xs font-bold text-white uppercase bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Activity
              </th>
              <th scope="col" className="px-6 py-3">
                Bank
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
            {currentTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                    : "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                }`}
              >
                <th>
                  <p className="px-6 py-4">{index + 1}</p>
                </th>
                <td className="px-6 py-4 font-medium text-white">
                  {transaction.transaction_items?.map((item) => (
                    <p key={item.id}>{item.title}</p>
                  ))}
                </td>
                <td className="px-6 py-4 font-medium text-white">
                  {transaction.payment_method?.name || "N/A"}
                </td>
                <td className="px-6 py-4">{transaction.status}</td>
                <td className="px-6 py-4">{transaction.createdAt}</td>
                <td className="px-6 py-4">{transaction.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/detail-transaction/${transaction.id}`}>
                    <button className="font-medium text-white hover:underline">
                      Detail
                    </button>
                  </Link>
                  {transaction.status === "pending" && (
                    <button
                      onClick={() => {
                        setIsModalOpen(true);
                        setSelectedTransaction(transaction);
                      }}
                      className="font-medium text-white hover:underline"
                    >
                      Update Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5 mb-5">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal Update Status */}
      {isModalOpen && (
        <ModalupdateStatus
          // isModalOpen={isModalOpen}
          toggleModal={setIsModalOpen}
          transactionId={selectedTransaction?.id}
        />
      )}
    </div>
  );
};

export default TransactionTable;
