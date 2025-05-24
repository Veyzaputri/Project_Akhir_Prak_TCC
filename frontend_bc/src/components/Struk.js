import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils";


const Struk = () => {
  const { id_struk } = useParams();
  const [struk, setStruk] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id_struk) {
      fetchStruk();
    }
  }, [id_struk]);

  const fetchStruk = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const res = await API.get(`/pasien/periksa/struk/${id_struk}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setStruk(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching struk data:", error);
      setError("Gagal memuat struk. Coba lagi nanti.");
    }
  };

  const handleSelesai = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      await API.put(`/struk/${id_struk}`, {
        status: "Selesai"
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      navigate("/historypasien");
    } catch (error) {
      console.error("Gagal menyelesaikan struk:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {error && <div className="notification is-danger">{error}</div>}
        {struk ? (
          <div className="box p-5">
            <h1 className="title has-text-centered">Struk Pemeriksaan</h1>
            <div className="content">
              <p><strong>Nama Pasien:</strong> {struk?.pasien?.nama}</p>
              <p><strong>Tanggal Periksa:</strong> {struk?.periksa?.tanggal_periksa}</p>
              <p><strong>Biaya Periksa:</strong> {struk?.periksa?.biaya_periksa}</p>
              <p><strong>Obat:</strong> {struk?.obat?.nama_obat}</p>
              <p><strong>Harga Obat:</strong> {struk?.obat?.harga}</p>
              <p><strong>Total Biaya:</strong> {struk?.total_biaya}</p>
            </div>
            {struk.status !== "Selesai" && (
              <button
                className="button is-primary mt-2"
                onClick={handleSelesai}
              >
                Selesai
              </button>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Struk;