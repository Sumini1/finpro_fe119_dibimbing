import Accordian from "./Accordian";

const Faq = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-7 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 mt-[-120px] py-28 text-white ">
      <div className="flex flex-col w-full lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:p-24 lg:mt-[-20px]">
        <div className="flex flex-col py-2 mb-3 lg:w-[50%] lg:mt-[-20px]">
          <h1 className="mb-8 text-2xl font-bold text-center lg:text-left lg:text-4xl ">
            Pertanyaan Yang Sering Ditanyakan
          </h1>
          <img src="/indo.jpg" alt="" className="mb-5 rounded-lg lg:w-full " />
        </div>
        {/*  Accordion */}
        <div className="w-full px-4 py-5 rounded-lg shadow-2xl  lg:w-[70%] lg:px-6 lg:py-8">
          <Accordian />
        </div>
      </div>
    </div>
  );
};

export default Faq;
