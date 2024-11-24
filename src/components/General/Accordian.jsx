import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";

const Accordian = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full max-w-3xl py-2 mx-auto justif-start items-srt">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full py-2 "
      >
        <span className="flex-row items-start justify-start lex f text-start">
          {question}
        </span>
        {open ? (
          <span>
            <MdArrowDropDown className="text-2xl" />
          </span>
        ) : (
          <span>
            <IoMdArrowDropup className="text-2xl" />
          </span>
        )}
      </button>
      <div className={open ? "block" : "hidden"}>
        <div className="flex flex-row items-start justify-start py-2 overflow-hidden ">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqData = [
    {
      question: "Apa itu Holidays.In ?",
      answer:
        "Holidays.In adalah Salah satu perusahaan online travel erbesar di Indonesia yang menyediakan berbagai kebutuhan perjalanan secara online:",
    },
    {
      question: "Kenapa harus Holidays.In?",
      answer:
        "Selalu ada promo setaip harinya, pemesanan cepat, dan harga terbaik",
    },
    {
      question: "Bagaimmana cara mendapatkan promo-nya ?",
      answer:
        " Anda dapat menghubungi kami melalui whatsapp di nomor 0822 1111 1111 atau media sosial kami tertera di website kami",
    },
    {
      question:
        "Benefit apa saja yang akan pelanggan dapatkan jika pilih Holidays.In?",
      answer: "Diskon selama 50%, pemesanan cepat, dan harga terbaik",
    },
    {
      question: "Bagaimana cara pemesanannya?",
      answer:
        "Anda dapat menghubungi kami melalui whatsapp di nomor 0822 1111 1111 atau media sosial kami tertera di website kami",
    },
    {
      question: "Apakah bisa refund jika tidak jadi menggunakan tiketnya",
      answer:
        "Ya, anda bisa refund jika tidak jadi menggunakan tiketnya dengan cara menghubungi kami melalui whatsapp di nomor 0822 1111 1111 atau media sosial kami tertera di website kami",
    },
    {
      question: "Apakah tersedia berbagai pembayaran ?",
      answer:
        "Ya, kami menyediakan 4 virtual account yang tersedia, yaitu Bank BNI, Bank BRI, Bank BCA, dan Bank Mandiri",
    },
  ];

  return (
    <div>
      {faqData.map((faq, index) => (
        <Accordian key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
};

export default FAQ;
