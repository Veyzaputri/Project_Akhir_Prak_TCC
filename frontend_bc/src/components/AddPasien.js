import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPasien = () => {
  const [nama, setNama] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [gender, setGender] = useState("");
  const [no_telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [id_dokter, setIDDokter] = useState("");
  const [list_dokter, setListDokter] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDokter();
  }, []);

  const fetchDokter = async () => {
    try {
      const res = await axios.get("http://localhost:5000/doctor");
      setListDokter(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const savePasien = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-pasien", {
        nama,
        tgl_lahir,
        gender,
        no_telp,
        alamat,
        id_dokter: parseInt(id_dokter),
      });
      navigate("/pasien");
    } catch (error) {
      console.error("Error saving patient data:", error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box p-5">
          <h1 className="title has-text-centered">Tambah Data Pasien</h1>
          <form onSubmit={savePasien}>
            <div className="field">
              <label className="label">Nama</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Pasien"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Tanggal Lahir</label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={tgl_lahir}
                  onChange={(e) => setTgl_lahir(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Jenis Kelamin</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <label className="label">No. Telepon</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={no_telp}
                  onChange={(e) => setTelp(e.target.value)}
                  placeholder="Nomor Telepon Pasien"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Alamat</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat Pasien"
                  required
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">Dokter</label>
              <div className="control">
                <div className="select is-fullwidth">
                  <select
                    value={id_dokter}
                    onChange={(e) => setIDDokter(e.target.value)}
                    required
                  >
                    <option value="">Pilih Dokter</option>
                    {list_dokter.map((dokter) => (
                      <option key={dokter.id_dokter} value={dokter.id_dokter}>
                        {dokter.nama_dokter} - {dokter.spesialis}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field has-text-centered">
              <button type="submit" className="button is-success is-fullwidth">
                Simpan Data Pasien
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPasien;
