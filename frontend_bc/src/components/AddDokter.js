import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const TambahDokter = () => {
    const navigate = useNavigate();
    const [nama_dokter, setNamaDokter] = useState("");
    const [spesialis, setSpesialis] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/add-doctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nama_dokter, spesialis }),
            });

            if (response.ok) {
                alert("Dokter berhasil ditambahkan!");
                navigate("/doctor");
            } else {
                alert("Gagal menambahkan dokter.");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat menambahkan dokter:", error);
        }
    };

    return (
        <div className="container mt-6">
            <div className="level mb-4">
                <div className="level-left">
                    <button
                        onClick={() => navigate("/doctor")}
                        className="button is-light is-flex is-align-items-center"
                        title="Kembali ke Daftar Dokter"
                    >
                        <span className="icon is-small">
                            <ArrowLeftIcon className="h-5 w-5" />
                        </span>
                    </button>
                    <h1 className="title is-3 ml-3">Tambah Dokter</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Nama Dokter</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Masukkan nama dokter"
                            value={nama_dokter}
                            onChange={(e) => setNamaDokter(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Spesialisasi</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Masukkan spesialisasi dokter"
                            value={spesialis}
                            onChange={(e) => setSpesialis(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field mt-4">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Simpan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TambahDokter;
