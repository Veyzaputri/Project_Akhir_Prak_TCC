import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const EditDokter = () => {
    const navigate = useNavigate();
    const { id_dokter } = useParams();
    const [nama_dokter, setNamaDokter] = useState("");
    const [spesialis, setSpesialis] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await fetch(`http://localhost:5000/dokter/${id_dokter}`);
                const data = await response.json();
                setNamaDokter(data.nama_dokter);
                setSpesialis(data.spesialis);
            } catch (error) {
                console.error("Gagal mengambil data dokter:", error);
            }
        };

        fetchDoctor();
    }, [id_dokter]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/dokter/${id_dokter}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nama_dokter, spesialis }),
            });

            if (response.ok) {
                alert("Data dokter berhasil diperbarui!");
                navigate("/doctor");
            } else {
                alert("Gagal memperbarui data dokter.");
            }
        } catch (error) {
            console.error("Terjadi kesalahan saat memperbarui dokter:", error);
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
                    <h1 className="title is-3 ml-3">Edit Dokter</h1>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Nama Dokter</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
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
                            value={spesialis}
                            onChange={(e) => setSpesialis(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="field mt-4">
                    <div className="control">
                        <button type="submit" className="button is-primary">
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditDokter;
