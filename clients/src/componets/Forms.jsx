import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";

import axios from "axios";
import { Context } from "../context/Context.jsx";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dataKec, dataKel } from "../data.js";

export function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);
  // const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_KEY_URL}/auth/login`,
        {
          username: username,
          password: password,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      // setIsLoading(false);
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-96 h-full">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            MAP MAPERS
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Username"
            type="text"
            size="lg"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            disabled={isFetching}
          >
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Belum Punya Akun?{" "}
            <Link to={"/register"} className="font-medium text-gray-900">
              Daftar
            </Link>
          </Typography>
        </CardFooter>
      </Card>
      {error && <p className="text-center text-red-500">{error}</p>}
      {isFetching && (
        <Typography
          variant="lead"
          color="blue-gray"
          className="text-center animate-bounce"
        >
          Loading......
        </Typography>
      )}
    </form>
  );
}

export function DaftarCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_KEY_URL}/auth/register`,
        {
          username,
          password,
        }
      );
      setIsLoading(false);
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-96 h-full">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            MAP MAPERS
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Username"
            type="text"
            size="lg"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            size="lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            type="submit"
            variant="gradient"
            fullWidth
            className="disabled:cursor-progress"
            disabled={isLoading}
          >
            Daftar
          </Button>
        </CardFooter>
      </Card>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Sudah Punya Akun?{" "}
        <Link to={"/login"} className="font-medium text-gray-900">
          Login
        </Link>
      </Typography>
      {error && <p className="text-center text-red-500">{error}</p>}
      {isLoading && (
        <Typography
          variant="lead"
          color="blue-gray"
          className="text-center animate-bounce"
        >
          Loading......
        </Typography>
      )}
    </form>
  );
}

export function Formulir() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [no_kk, setNokk] = useState("");
  const [no_ktp, setNoktp] = useState("");
  const [no_rt, setNort] = useState("");
  const [no_rw, setNorw] = useState("");
  const [no_tps, setNotps] = useState("");
  const [no_hp, setNohp] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [simpul, setSimpul] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const [data, setData] = useState({});

  // useEffect(() => {
  //   const getDataKpu = async () => {
  //     const options = {
  //       method: "GET",
  //       url: "https://cek-dpt-online.p.rapidapi.com/api/v3/check",
  //       params: {
  //         nik: "7271011804970003",
  //       },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "3278f0e84dmsh2029334cd3a0a62p180352jsn2ef262daaf5c",
  //         "X-RapidAPI-Host": "cek-dpt-online.p.rapidapi.com",
  //       },
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getDataKpu();
  // }, [no_ktp]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_KEY_URL}/posts`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isNoKtpExists = data.some((post) => post.no_ktp === no_ktp);
    if (isNoKtpExists) {
      alert("No Ktp Sudah Terdaftar.");
      setIsLoading(false);
      return;
    }
    const newPost = {
      name,
      no_kk,
      no_ktp,
      no_rt,
      no_rw,
      no_tps,
      no_hp,
      kelurahan,
      kecamatan,
      simpul,
    };
    try {
      await axios.post(`${import.meta.env.VITE_API_KEY_URL}/posts`, newPost);
      alert("Data Berhasil Terinpunt");
      // Reset loading state to false
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <div className="flex flex-col justify-center items-center">
        <Typography variant="h4" color="blue-gray">
          Formulir Input Data Calon Pemilih MAP
        </Typography>
      </div>
      <form
        className="mt-8 mb-2 w-full max-w-screen-xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nama Lengkap
          </Typography>
          <Input
            size="lg"
            name="name"
            placeholder="Nama Lengkap"
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nomor Kartu Keluarga
          </Typography>
          <Input
            size="lg"
            type="number"
            name="no_kk"
            maxLength={16}
            min={0}
            onChange={(e) => setNokk(e.target.value)}
            placeholder="Nomor KK"
            className=" w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nomor Kartu Tanda Penduduk
          </Typography>
          <Input
            size="lg"
            type="number"
            name="no_ktp"
            maxLength={16}
            pattern="[0-9]{16}"
            min={0}
            onChange={(e) => setNoktp(e.target.value)}
            placeholder="Nomor KTP"
            className=" w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            PILIH KECAMATAN
          </Typography>
          <Select
            className="bg-white"
            onChange={(value) => setKecamatan(value)}
          >
            {dataKec.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            PILIH KELURAHAN
          </Typography>
          <Select
            className="bg-white"
            onChange={(value) => setKelurahan(value)}
          >
            {dataKel.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>

          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Nomor RT
            </Typography>
            <Input
              type="number"
              name="no_rt"
              size="lg"
              onChange={(e) => setNort(e.target.value)}
              placeholder="Masukan Nomor RT"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Nomor RW
            </Typography>
            <Input
              type="number"
              name="no_rw"
              size="lg"
              onChange={(e) => setNorw(e.target.value)}
              placeholder="Masukan Nomor RT"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Nomor TPS
            </Typography>
            <Input
              type="number"
              name="no_tps"
              size="lg"
              onChange={(e) => setNotps(e.target.value)}
              placeholder="Masukan Nomor TPS"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
            />
          </div>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Nomor Handphone
          </Typography>
          <Input
            type="number"
            name="no_hp"
            size="lg"
            onChange={(e) => setNohp(e.target.value)}
            placeholder="Masukan Nomor Hp Anda"
            className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Simpul
          </Typography>
          <Input
            type="text"
            name="simpul"
            size="lg"
            onChange={(e) => setSimpul(e.target.value)}
            placeholder="Masukan Nama Simpul"
            className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            required
          />
        </div>
        <Button
          type="submit"
          className="mt-6 w-full disabled:bg-blue-500"
          disabled={isLoading}
        >
          Submit
        </Button>
        {isLoading && (
          <Typography type="lead" color="blue-gray" className="animate-bounce">
            Loading ......
          </Typography>
        )}
      </form>
    </Card>
  );
}

export function FormulirEdit() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [no_kk, setNokk] = useState("");
  const [no_ktp, setNoktp] = useState("");
  const [no_rt, setNort] = useState("");
  const [no_rw, setNorw] = useState("");
  const [no_tps, setNotps] = useState("");
  const [no_hp, setNohp] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [simpul, setSimpul] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_KEY_URL}/posts/${id}`
        );
        setPost(res.data);
        setName(res.data.name);
        setNokk(res.data.no_kk);
        setNoktp(res.data.no_ktp);
        setNort(res.data.no_rt);
        setNorw(res.data.no_rw);
        setNotps(res.data.no_tps);
        setNohp(res.data.no_hp);
        setKelurahan(res.data.kelurahan);
        setKecamatan(res.data.kecamatan);
        setSimpul(res.data.simpul);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [id]);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_KEY_URL}/posts/${id}`, {
        name,
        no_kk,
        no_ktp,
        no_rt,
        no_rw,
        no_tps,
        no_hp,
        kecamatan,
        kelurahan,
        simpul,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    } finally {
      alert("Update Berhasil");
      setIsLoading(false);
      window.location.reload();
    }
  };
  return (
    <Card color="transparent" shadow={false}>
      <div className="flex flex-col justify-center items-center">
        <Typography variant="h4" color="blue-gray">
          Formulir Edit Data Calon Pemilih MAP
        </Typography>
        {!updateMode && (
          <Button className="mt-5" onClick={() => setUpdateMode(true)}>
            Edit
          </Button>
        )}
      </div>
      <form className="mt-2 mb-2 w-full max-w-screen-xl px-4 py-2 bg-white rounded-lg">
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nama Lengkap
          </Typography>
          {updateMode ? (
            <Input
              size="lg"
              name="name"
              placeholder="Nama Lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.name}
            </Typography>
          )}

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nomor Kartu Keluarga
          </Typography>
          {updateMode ? (
            <Input
              size="lg"
              type="number"
              name="no_kk"
              maxLength={16}
              value={no_kk}
              onChange={(e) => setNokk(e.target.value)}
              placeholder="Nomor KK"
              className=" w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.no_kk}
            </Typography>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nomor Kartu Tanda Penduduk
          </Typography>
          {updateMode ? (
            <Input
              type="number"
              name="no_ktp"
              size="lg"
              maxLength={16}
              value={no_ktp}
              onChange={(e) => setNoktp(e.target.value)}
              placeholder="Nomor Kartu Tanda Penduduk"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.no_ktp}
            </Typography>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nama Kecamatan
          </Typography>
          {updateMode ? (
            <Select
              className="bg-white"
              value={kecamatan}
              onChange={(value) => setKecamatan(value)}
            >
              {dataKec.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.kecamatan}
            </Typography>
          )}
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nama Kelurahan
          </Typography>
          {updateMode ? (
            <Select
              className="bg-white"
              value={kelurahan}
              onChange={(value) => setKelurahan(value)}
            >
              {dataKel.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.kelurahan}
            </Typography>
          )}

          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Nomor RT
            </Typography>
            {updateMode ? (
              <Input
                type="text"
                name="no_rt"
                size="lg"
                value={no_rt}
                onChange={(e) => setNort(e.target.value)}
                placeholder="Masukan Nomor RT"
                className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            ) : (
              <Typography variant="lead" color="blue-gray">
                {post.no_rt}
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Nomor RW
            </Typography>
            {updateMode ? (
              <Input
                type="text"
                name="no_rw"
                size="lg"
                value={no_rw}
                onChange={(e) => setNorw(e.target.value)}
                placeholder="Masukan Nomor RT"
                className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            ) : (
              <Typography variant="lead" color="blue-gray">
                {post.no_rw}
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Nomor TPS
            </Typography>
            {updateMode ? (
              <Input
                type="text"
                name="no_tps"
                size="lg"
                value={no_tps}
                onChange={(e) => setNotps(e.target.value)}
                placeholder="Masukan Nomor TPS"
                className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            ) : (
              <Typography variant="lead" color="blue-gray">
                {post.no_tps}
              </Typography>
            )}
          </div>
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Nomor Handphone
          </Typography>
          {updateMode ? (
            <Input
              type="number"
              name="no_hp"
              size="lg"
              value={no_hp}
              onChange={(e) => setNohp(e.target.value)}
              placeholder="Masukan Nomor Hp Anda"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.no_hp}
            </Typography>
          )}
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            Simpul
          </Typography>
          {updateMode ? (
            <Input
              type="text"
              name="simpul"
              size="lg"
              value={simpul}
              onChange={(e) => setSimpul(e.target.value)}
              placeholder="Masukan Nama Simpul"
              className="w-full bg-white !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          ) : (
            <Typography variant="lead" color="blue-gray">
              {post.simpul}
            </Typography>
          )}
        </div>
        {updateMode && (
          <Button
            onClick={handleUpdate}
            disabled={isLoading}
            className="mt-6 w-full disabled:cursor-progress"
          >
            Update
          </Button>
        )}
        {isLoading && (
          <Typography
            variant="lead"
            color="blue-gray"
            className="text-center animate-bounce"
          >
            Loading......
          </Typography>
        )}
      </form>
    </Card>
  );
}
