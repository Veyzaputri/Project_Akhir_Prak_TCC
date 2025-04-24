import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon, HomeIcon } from "@heroicons/react/24/outline";

const DokterList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("http://localhost:5000/doctor");
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error("Gagal mengambil data dokter:", error);
            }
        };

        fetchDoctors();
    }, []);

    const navigateToAddDokter = () => {
        navigate("/dokter/add");
    };

    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    const handleEdit = (id_dokter) => {
        navigate(`/dokter/edit/${id_dokter}`);
    };

    const handleDelete = async (id_dokter) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus dokter ini?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/dokter/${id_dokter}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    const updatedDoctors = doctors.filter((doctor) => doctor.id_dokter !== id_dokter);
                    setDoctors(updatedDoctors);
                } else {
                    console.error("Gagal menghapus dokter dari server");
                }
            } catch (error) {
                console.error("Error saat menghapus dokter:", error);
            }
        }
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
                    <h1 className="title is-3">Daftar Dokter</h1>
                </div>
                <div className="level-right">
                    <button
                        onClick={navigateToAddDokter}
                        className="button is-primary is-flex is-align-items-center"
                    >
                        <span className="icon is-small">
                            <PlusIcon className="h-5 w-5" />
                        </span>
                        <span>Tambah Dokter</span>
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama</th>
                            <th>Spesialisasi</th>
                            <th className="has-text-centered">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.length > 0 ? (
                            doctors.map((doctor, index) => (
                                <tr key={doctor.id_dokter}>
                                    <td>{index + 1}</td>
                                    <td>{doctor.nama_dokter}</td>
                                    <td>{doctor.spesialis}</td>
                                    <td className="has-text-centered">
                                        <button
                                            onClick={() => handleEdit(doctor.id_dokter)}
                                            className="button is-small is-info mr-2"
                                            title="Edit"
                                        >
                                            <span className="icon is-small">
                                                <PencilIcon className="h-4 w-4" />
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor.id_dokter)}
                                            className="button is-small is-danger"
                                            title="Hapus"
                                        >
                                            <span className="icon is-small">
                                                <TrashIcon className="h-4 w-4" />
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="has-text-centered has-text-grey">
                                    Tidak ada data dokter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DokterList;
