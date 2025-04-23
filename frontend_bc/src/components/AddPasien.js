import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPasien = () => {
  const [nama, setNama] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [gender, setGender] = useState("");
  const [no_telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();

  const savePasien = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add-pasien", {
        nama,
        tgl_lahir,
        gender,
        no_telp,
        alamat,
      });
      navigate("/pasien");
    } catch (error) {
      console.log(error);
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
                ></textarea>
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