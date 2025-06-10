import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import useStore from "./store";
import { ToastContainer, Bounce } from "react-toastify";
export default function Layout() {
  const { theme } = useStore();
  return (
    <div data-theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Nav />
      <Outlet /> {/* Child routes go here */}
      <Footer />
    </div>
  );
}
