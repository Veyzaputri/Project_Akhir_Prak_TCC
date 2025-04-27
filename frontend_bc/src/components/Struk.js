import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Struk = () => {
  const { id_struk } = useParams();
  const [struk, setStruk] = useState(null);

  useEffect(() => {
    if (id_struk) {
      fetchStruk();
    }
  }, [id_struk]);

  const fetchStruk = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/struk/${id_struk}`);
      console.log("Struk response:", res.data);
      setStruk(res.data);
    } catch (error) {
      console.error("Error fetching struk data:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        {struk ? (
          <div className="box p-5">
            <h1 className="title has-text-centered">Struk Pemeriksaan</h1>
            <div className="content">
              <p><strong>Nama Pasien:</strong> {struk?.Pasien?.nama}</p>
              <p><strong>Tanggal Periksa:</strong> {struk?.Periksa?.tanggal_periksa}</p>
              <p><strong>Biaya Periksa:</strong> {struk?.Periksa?.biaya_periksa}</p>
              <p><strong>Obat:</strong> {struk?.Obat?.nama_obat}</p>
              <p><strong>Harga Obat:</strong> {struk?.Obat?.harga}</p>
              <p><strong>Total Biaya:</strong> {struk?.total_biaya}</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Struk;