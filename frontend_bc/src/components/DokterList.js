import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils"; // pastikan instance Axios sudah benar

const DokterList = () => {
  const [doctors, setDoctors] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }

      const response = await API.get("/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setDoctors(response.data);
      setMsg("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403) {
        setMsg("Akses ditolak. Silakan login ulang.");
      } else if (error.response && error.response.status === 401) {
        setMsg("Token tidak valid atau sudah kadaluwarsa. Silakan login ulang.");
      } else {
        setMsg("Gagal mengambil data dokter.");
      }
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }

      await API.delete(`/dokter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      fetchDoctors(); // refresh list setelah delete
    } catch (error) {
      console.error(error);
      setMsg("Gagal menghapus dokter.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <h1 className="title has-text-centered has-text-primary">Daftar Dokter</h1>
        {msg && <p className="has-text-danger has-text-centered">{msg}</p>}

        <div className="is-flex is-justify-content-space-between mb-4">
          <Link to="/add-doctor" className="button is-success is-rounded">
            Tambah Dokter
          </Link>
        </div>

        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr className="has-background-primary-light">
              <th className="has-text-centered">No</th>
              <th>Nama</th>
              <th>Spesialisasi</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <tr key={doctor.id_dokter}>
                  <td className="has-text-centered">{index + 1}</td>
                  <td>{doctor.nama_dokter}</td>
                  <td>{doctor.spesialis}</td>
                  <td className="is-flex is-justify-content-center">
                    <button
                      onClick={() => navigate(`/edit-doctor/${doctor.id_dokter}`)}
                      className="button is-small is-info is-light is-rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Apakah kamu yakin ingin menghapus dokter ${doctor.nama_dokter}?`
                          )
                        ) {
                          deleteDoctor(doctor.id_dokter);
                        }
                      }}
                      className="button is-small is-danger is-light is-rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="has-text-centered">
                  Tidak ada data dokter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DokterList;
