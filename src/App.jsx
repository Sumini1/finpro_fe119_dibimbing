import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
// import Navbar from "./components/General/Navbar";

const App = () => {
  const element = useRoutes(routes);

  return (
    <>
      {/* <Navbar /> */}
      {element}
    </>
  );
};

export default App;
