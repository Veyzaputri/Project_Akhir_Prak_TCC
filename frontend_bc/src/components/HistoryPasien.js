import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { API } from "../utils";

const HistoryPasien = () => {
    const [struks, setStruks] = useState([]);
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const fetchSelesaiStruks = async () => {
            try {
                const token = localStorage.getItem("accessToken");
            if (!token) {
                setMsg("Silakan login terlebih dahulu.");
                return;
            }
                const res = await API.get("/struk/selesai", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
                setStruks(res.data);
            } catch (err) {
                console.error("Gagal mengambil data history pasien:", err.message);
            }
        };
        fetchSelesaiStruks();
    }, []);

    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <div className="container mt-6">
            <div className="level mb-4">
                <div className="level-left">
                    <button
                        onClick={navigateToDashboard}
                        className="button is-light mr-3 is-flex is-align-items-center"
                        title="Kembali ke Dashboard"
                    >
                        <span className="icon is-small">
                            <HomeIcon className="h-5 w-5" />
                        </span>
                    </button>
                    <h1 className="title is-3">Riwayat Pemeriksaan Pasien</h1>
                </div>
            </div>

            <div className="table-container">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Pasien</th>
                            <th>Tanggal Periksa</th>
                            <th>Biaya Periksa</th>
                            <th>Obat</th>
                            <th>Harga Obat</th>
                            <th>Total Biaya</th>
                        </tr>
                    </thead>
                    <tbody>
                        {struks.length > 0 ? (
                            struks.map((struk, index) => (
                                <tr key={struk.id_struk}>
                                    <td>{index + 1}</td>
                                    <td>{struk.pasien?.nama || "-"}</td>
                                    <td>{new Date(struk.periksa?.tanggal_periksa).toLocaleDateString()}</td>
                                    <td>{struk.periksa?.biaya_periksa ?? "-"}</td>
                                    <td>{struk.obat?.nama_obat || "-"}</td>
                                    <td>{struk.obat?.harga ?? "-"}</td>
                                    <td>{struk.total_biaya}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="has-text-centered has-text-grey">
                                    Tidak ada data riwayat pemeriksaan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HistoryPasien;