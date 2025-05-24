import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../utils";

function EditDokter() {
  const [namaDokter, setNamaDokter] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState("")

  useEffect(() => {
    getDokterById();
  }, []);

  const getDokterById = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const response = await API.get(`/dokter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials:true,
      });

      setNamaDokter(response.data.nama_dokter);
      setSpesialis(response.data.spesialis);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data dokter.");
    }
  };

  const updateDokter = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      await API.put(
        `/dokter/${id}`,
        {
          nama_dokter: namaDokter,
          spesialis,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials:true,
        }
      );

      navigate("/doctor"); // misal halaman list dokter
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate data dokter. Pastikan kamu sudah login.");
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title has-text-centered has-text-info">✏️ Edit Dokter</h1>
          <form onSubmit={updateDokter}>
            <div className="field">
              <label className="label">Nama Dokter</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={namaDokter}
                  onChange={(e) => setNamaDokter(e.target.value)}
                  placeholder="Masukkan nama dokter"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Spesialis</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={spesialis}
                  onChange={(e) => setSpesialis(e.target.value)}
                  placeholder="Masukkan spesialis"
                  required
                />
              </div>
            </div>

            <div className="field has-text-centered">
              <button type="submit" className="button is-info is-medium is-rounded px-5">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDokter;
