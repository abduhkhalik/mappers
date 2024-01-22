import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import axios from "axios";
export function ChartsBar() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_KEY_URL}/posts`
        );
        setData(res.data);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [data]);

  // console.log(user.kecamatan)

  const kelurahanCounts = {};

  data.forEach((item) => {
    const kelurahan = item.kelurahan;
    kelurahanCounts[kelurahan] = (kelurahanCounts[kelurahan] || 0) + 1;
  });

  const dataByKelurahan = Object.keys(kelurahanCounts).map((kelurahan) => ({
    kelurahan: kelurahan,
    value: kelurahanCounts[kelurahan],
  }));

  const dataByKecamatan = {};

  data.forEach((item) => {
    const kecamatan = item.kecamatan;
    const kelurahan = item.kelurahan;
    const votes = item.votes || 1; // Assuming each item has a 'votes' property; default to 1 if not present

    // Initialize the district if it doesn't exist
    if (!dataByKecamatan[kecamatan]) {
      dataByKecamatan[kecamatan] = {
        totalVotes: 0,
        kelurahanCounts: {},
      };
    }

    // Update the counts for the district and kelurahan
    dataByKecamatan[kecamatan].totalVotes += votes;
    dataByKecamatan[kecamatan].kelurahanCounts[kelurahan] =
      (dataByKecamatan[kecamatan].kelurahanCounts[kelurahan] || 0) + votes;
  });

  // Transform the data for each district
  const dataByKecamatanArray = Object.keys(dataByKecamatan).map((kecamatan) => {
    const districtData = dataByKecamatan[kecamatan];
    const kelurahanData = Object.keys(districtData.kelurahanCounts).map(
      (kelurahan) => ({
        kelurahan: kelurahan,
        value: districtData.kelurahanCounts[kelurahan],
      })
    );

    return {
      kecamatan: kecamatan,
      totalVotes: districtData.totalVotes,
      kelurahanData: kelurahanData,
    };
  });

  // eslint-disable-next-line no-unused-vars
  let grandTotalVotes = 0;

  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Data",
        data: dataByKelurahan.map((item) => item.value),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#40A2D8"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: dataByKelurahan.map((item) => item.kelurahan),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Bar Chart
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              Grafik Data Penginputan
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
      <div className="flex justify-center mt-10 items-center">
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nama Kecamatan
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama kelurahan
                </th>
                <th scope="col" className="px-6 py-3">
                  Jumlah Suara / kelurahan
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Suara / Kecamatan
                </th>
              </tr>
            </thead>
            {dataByKecamatanArray.map((kecamatan, kecamatanIndex) => (
              <React.Fragment key={kecamatanIndex}>
                {kecamatan.kelurahanData.map((kelurahan, kelurahanIndex) => (
                  <tr key={kelurahanIndex} className="bg-white border-b">
                    {kelurahanIndex === 0 && (
                      <td
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        rowSpan={kecamatan.kelurahanData.length}
                      >
                        {kecamatan.kecamatan}
                      </td>
                    )}
                    <td className="px-6 py-4">{kelurahan.kelurahan}</td>
                    <td className="px-6 py-4">{kelurahan.value}</td>
                    {kelurahanIndex === 0 && (
                      <td
                        className="px-6 py-4"
                        rowSpan={kecamatan.kelurahanData.length}
                      >
                        {kecamatan.totalVotes}
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </table>
        </div>
      </div>
      <div className="bg-white flex items-center">
        <p className="ml-5 font-bold">Total Suara Keseluruhan :</p>
        {dataByKecamatanArray.map((kecamatan, kecamatanIndex) => {
          grandTotalVotes += kecamatan.totalVotes;
          return (
            <p key={kecamatanIndex} className="mr-5">
              {kecamatanIndex === 1 && <span>{grandTotalVotes}</span>}
            </p>
          );
        })}
      </div>
    </>
  );
}
