import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

function Simpul() {
  const [data, setData] = useState([]);
  const [ifLoading, setIfLoading] = useState(false);

  const unitsCategory = [
    ...new Set(data.map((vals) => vals.simpul.toUpperCase())),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIfLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_KEY_URL}/posts`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIfLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div className="container">
        <Typography
          variant="h3"
          color="blue-gray"
          className="text-center uppercase"
        >
          List Simpul MAPPERS
        </Typography>
        <div className="w-full flex justify-center py-5 items-center">
          <table className="bg-white max-w-lg py-2 border border-solid border-black">
            <thead>
              <tr className="flex justify-center items-center gap-5 border border-solid">
                <th className="text-center ">NOMOR</th>
                <th className="text-center">NAMA SIMPUL</th>
              </tr>
            </thead>
            {ifLoading ? (
              <Typography
                variant="lead"
                color="blue-gray"
                className="animate-bounce"
              >
                Loading ......
              </Typography>
            ) : (
              <tbody>
                {unitsCategory.map((item, index) => (
                  <tr
                    key={index}
                    className="flex items-center border border-solid"
                  >
                    <td>{index++}</td>
                    <td className="ml-20">{item}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </section>
  );
}

export default Simpul;
