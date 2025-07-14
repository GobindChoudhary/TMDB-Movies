import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/instance";
import { useEffect, useState } from "react";
import Loader from "../../utils/Loader";

const PersonDetail = () => {
  const { id } = useParams();
  const [persondetail, setpersondetail] = useState(null);
  const getPersonDetails = async () => {
    try {
      const { data } = await axios.get(`/person/${id}`);
      setpersondetail(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPersonDetails();
  }, []);

  if (!persondetail)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className=" ">
      <h1 className="text-5xl">personDEtail</h1>
    </div>
  );
};

export default PersonDetail;
