import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

const AddObat = () => {
  const [nama_obat, setNama] = useState("");
  const [definisi, setDefinisi] = useState("");
  const [efek_samping, setEfekSamping] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const saveObat = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      await API.post(
        "/add-obat",
        {
          nama_obat,
          definisi,
          efek_samping,
          harga: parseInt(harga),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      navigate("/obat");
    } catch (error) {
      console.error("Error saving obat data:", error);
      setMsg("Gagal menyimpan data obat.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title has-text-centered">Tambah Data Obat</h1>
          {msg && <div className="notification is-danger">{msg}</div>}
          <form onSubmit={saveObat}>
            <div className="field">
              <label className="label">Nama Obat</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nama_obat}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Definisi</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={definisi}
                  onChange={(e) => setDefinisi(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Efek Samping</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={efek_samping}
                  onChange={(e) => setEfekSamping(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Harga</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field has-text-centered">
              <button type="submit" className="button is-success is-fullwidth">
                Simpan Data Obat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddObat;
