import loader from "../../public/loader.webp";

const Loader = () => {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-black">
      <img className="h-[50%]" src={loader} alt="" />
    </div>
  );
};
export default Loader;
