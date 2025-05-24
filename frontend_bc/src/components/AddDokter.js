// src/pages/AddDokter.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../utils"; // pastikan ini mengarah ke instance axios

function AddDokter() {
    const [nama_dokter, setNamaDokter] = useState("");
    const [spesialis, setSpesialis] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    const saveDokter = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setMsg("Silakan login terlebih dahulu.");
                return;
            }

            await API.post(
                "/add-doctor",
                { nama_dokter, spesialis },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            navigate("/doctor"); // redirect ke halaman list dokter
        } catch (error) {
            console.error(error);
            alert("Gagal menyimpan data dokter. Coba login ulang jika perlu.");
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <div className="box p-5">
                    <h1 className="title has-text-centered has-text-primary">Tambah Dokter</h1>
                    <form onSubmit={saveDokter}>
                        <div className="field">
                            <label className="label">Nama Dokter</label>
                            <div className="control">
                                <input
                                    type="text"
                                    className="input is-medium is-rounded"
                                    value={nama_dokter}
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
                            <button type="submit" className="button is-success is-medium is-rounded px-5">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddDokter;
