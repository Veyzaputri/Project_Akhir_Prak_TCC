import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

const PasienList = () => {
  const [pasien, setPasien] = useState([]);
  const [dokterList, setDokterList] = useState([]);

  useEffect(() => {
    getPasien();
    getDokter();
  }, []);

  const getPasien = async () => {
    try {
      const response = await axios.get("http://localhost:5000/pasien");
      setPasien(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDokter = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dokter");
      setDokterList(response.data);
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

  const findDokterName = (idDokter) => {
    const dokter = dokterList.find((d) => d.id_dokter === idDokter);
    return dokter ? dokter.nama_dokter : "-";
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-full">
        <Link to={"add"} className="button is-success mb-3">
          Tambah Pasien
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Tanggal Lahir</th>
              <th>Jenis Kelamin</th>
              <th>No. Telepon</th>
              <th>Alamat</th>
              <th>Nama Dokter</th>
              <th style={{ width: "180px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pasien.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.tgl_lahir}</td>
                <td>{item.gender}</td>
                <td>{item.no_telp}</td>
                <td>{item.alamat}</td>
                <td>{item.dokter?.nama_dokter || '-'}</td>
                <td>
                  <div className="buttons">
                    <Link
                      to={`periksa/${item.id}`}
                      className="button is-small is-primary"
                      title="Periksa"
                    >
                      <FontAwesomeIcon icon={faNotesMedical} />
                    </Link>
                    <Link
                      to={`edit/${item.id}`}
                      className="button is-small is-info"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <button
                      onClick={() => deletePasien(item.id)}
                      className="button is-small is-danger"
                      title="Selesai"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PasienList;
