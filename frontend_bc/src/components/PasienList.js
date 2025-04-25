import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { PencilIcon, TrashIcon, ClipboardDocumentListIcon, PlusIcon, HomeIcon, CheckIcon } from "@heroicons/react/24/outline";

const PasienList = () => {
  const navigate = useNavigate();
  const [pasien, setPasien] = useState([]);

  useEffect(() => {
    getPasien();
  }, []);

  const getPasien = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pasien");
      setPasien(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePasien = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/pasien/${id}`);
      getPasien();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-6">
      <div className="level mb-4">
        <div className="level-left">
          <button
            onClick={() => navigate("/dashboard")}
            className="button is-light mr-3 is-flex is-align-items-center"
            title="Kembali ke Dashboard"
          >
            <span className="icon is-small">
              <HomeIcon className="h-5 w-5" />
            </span>
          </button>
          <h1 className="title is-3">Daftar Pasien</h1>
        </div>
        <div className="level-right">
          <Link to="add" className="button is-primary is-flex is-align-items-center">
            <span className="icon is-small">
              <PlusIcon className="h-5 w-5" />
            </span>
            <span>Tambah Pasien</span>
          </Link>
        </div>
      </div>

      <div className="table-container">
        <table className="table is-bordered is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Tanggal Lahir</th>
              <th>Jenis Kelamin</th>
              <th>No. Telepon</th>
              <th>Alamat</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasien.length > 0 ? (
              pasien.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nama}</td>
                  <td>{item.tgl_lahir}</td>
                  <td>{item.gender}</td>
                  <td>{item.no_telp}</td>
                  <td>{item.alamat}</td>
                  <td className="has-text-centered">
                    <div className="buttons is-centered is-inline-flex">
                      <Link
                        to={`edit/${item.id}`}
                        className="button is-small is-info"
                        title="Edit"
                      >
                        <span className="icon is-small">
                          <PencilIcon className="h-4 w-4" />
                        </span>
                      </Link>
                      <Link
                        to={`periksa/${item.id}`}
                        className="button is-small is-warning"
                        title="Periksa"
                      >
                        <span className="icon is-small">
                          <ClipboardDocumentListIcon className="h-4 w-4" />
                        </span>
                      </Link>
                      <button
                        onClick={() => deletePasien(item.id)}
                        className="button is-small is-success"
                        title="Selesai"
                      >
                        <span className="icon is-small">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="has-text-centered has-text-grey">
                  Tidak ada data pasien.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasienList;
