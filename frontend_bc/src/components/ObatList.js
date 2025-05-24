import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon, HomeIcon } from "@heroicons/react/24/outline";
import { API } from "../utils";

const ObatList = () => {
  const navigate = useNavigate();
  const [obat, setObat] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setMsg("Silakan login terlebih dahulu.");
          return;
        }
        const response = await API.get("/obat", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setObat(response.data);
      } catch (error) {
        console.error("Gagal mengambil data obat:", error);
      }
    };
    fetchObat();
  }, []);

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleTambah = () => {
    navigate("/add-obat");
  };

  const handleEdit = (obat) => {
    navigate(`/obat/edit/${obat.id_obat}`);
  };

  const handleDelete = async (item) => {
    try {
      const token = localStorage.getItem("accessToken");
      await API.delete(`/obat/${item.id_obat}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setObat(obat.filter(o => o.id_obat !== item.id_obat));
    } catch (error) {
      console.error("Gagal menghapus obat:", error);
    }
  };

  return (
    <div className="container mt-6">
      <div className="level mb-4">
        <div className="level-left">
          <button onClick={navigateToDashboard} className="button is-light mr-3" title="Kembali ke Dashboard">
            <HomeIcon className="h-5 w-5" />
          </button>
          <h1 className="title is-3">Daftar Obat</h1>
        </div>
        <div className="level-right">
          <button onClick={handleTambah} className="button is-primary">
            <PlusIcon className="h-5 w-5" /> Tambah Obat
          </button>
        </div>
      </div>

      {msg && <p className="has-text-danger">{msg}</p>}

      <table className="table is-bordered is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Obat</th>
            <th>Definisi</th>
            <th>Efek Samping</th>
            <th>Harga</th>
            <th className="has-text-centered">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {obat.length ? obat.map((item, idx) => (
            <tr key={item.id_obat}>
              <td>{idx + 1}</td>
              <td>{item.nama_obat}</td>
              <td>{item.definisi}</td>
              <td>{item.efek_samping}</td>
              <td>{item.harga}</td>
              <td className="has-text-centered">
                <button className="button is-small is-info mr-1" onClick={() => handleEdit(item)}>
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button className="button is-small is-danger" onClick={() => handleDelete(item)}>
                  <TrashIcon className="h-4 w-4" />
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="has-text-centered has-text-grey">Tidak ada data obat.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ObatList;
