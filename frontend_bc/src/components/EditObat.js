import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../utils";

function EditObat() {
  const [namaObat, setNamaObat] = useState("");
  const [definisi, setDefinisi] = useState("");
  const [efekSamping, setEfekSamping] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getObatById();
  }, []);

  const getObatById = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const response = await API.get(`/obat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setNamaObat(response.data.nama_obat);
      setDefinisi(response.data.definisi);
      setEfekSamping(response.data.efek_samping);
      setHarga(response.data.harga);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data obat.");
    }
  };

  const updateObat = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      await API.put(
        `/obat/${id}`,
        {
          nama_obat: namaObat,
          definisi,
          efek_samping: efekSamping,
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
      console.error(error);
      alert("Gagal mengupdate data obat. Pastikan kamu sudah login.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title has-text-centered has-text-warning">✏️ Edit Obat</h1>
          {msg && <div className="notification is-danger">{msg}</div>}
          <form onSubmit={updateObat}>
            <div className="field">
              <label className="label">Nama Obat</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={namaObat}
                  onChange={(e) => setNamaObat(e.target.value)}
                  placeholder="Masukkan nama obat"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Definisi</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={definisi}
                  onChange={(e) => setDefinisi(e.target.value)}
                  placeholder="Masukkan definisi obat"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Efek Samping</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={efekSamping}
                  onChange={(e) => setEfekSamping(e.target.value)}
                  placeholder="Masukkan efek samping"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Harga</label>
              <div className="control">
                <input
                  type="number"
                  className="input is-medium is-rounded"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  placeholder="Masukkan harga"
                  required
                />
              </div>
            </div>

            <div className="field has-text-centered">
              <button type="submit" className="button is-warning is-medium is-rounded px-5">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditObat;
