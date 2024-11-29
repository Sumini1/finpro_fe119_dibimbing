
const ErrorPage = () => {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-2 text-3xl font-bold text-blue-600">Oops!</h1>
      <p className="my-5 text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg text-red-500">
        Not Found
      </p>
    </div>
  );
};

export default ErrorPage;
