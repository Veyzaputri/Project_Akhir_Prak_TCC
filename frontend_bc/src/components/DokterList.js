import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon, HomeIcon } from "@heroicons/react/24/outline";
<<<<<<< HEAD
import EditDokter from "./EditDokter";
import HapusDokter from "./HapusDokter";
import AddDokter from "./AddDokter";
=======
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import ModalHapus from "./ModalHapus";
>>>>>>> 73d4460f2b743fe6fdd8d0b715f41ff55ade6960

const DokterList = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isHapusOpen, setIsHapusOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

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

    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditOpen(true);
    };

    const handleDelete = (doctor) => {
        setSelectedDoctor(doctor);
        setIsHapusOpen(true);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await fetch("http://localhost:5000/add-doctor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newDoctor = await response.json();
                setDoctors([...doctors, newDoctor]);
                setIsAddOpen(false);
            } else {
                console.error("Gagal menambahkan dokter");
            }
        } catch (error) {
            console.error("Error saat menambahkan dokter:", error);
        }
    };

    const handleSave = async (formData) => {
        try {
            const response = await fetch(`http://localhost:5000/dokter/${selectedDoctor.id_dokter}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedDoctor = await response.json();
                setDoctors(
                    doctors.map((doctor) =>
                        doctor.id_dokter === updatedDoctor.id_dokter ? updatedDoctor : doctor
                    )
                );
                setIsEditOpen(false);
            } else {
                console.error("Gagal memperbarui dokter");
            }
        } catch (error) {
            console.error("Error saat mengedit dokter:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/dokter/${selectedDoctor.id_dokter}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setDoctors(doctors.filter((doctor) => doctor.id_dokter !== selectedDoctor.id_dokter));
                setIsHapusOpen(false);
            } else {
                console.error("Gagal menghapus dokter");
            }
        } catch (error) {
            console.error("Error saat menghapus dokter:", error);
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
                        onClick={() => setIsAddOpen(true)}
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
                                            onClick={() => handleEdit(doctor)}
                                            className="button is-small is-info mr-2"
                                            title="Edit"
                                        >
                                            <span className="icon is-small">
                                                <PencilIcon className="h-4 w-4" />
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doctor)}
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

            {/* Modal Components */}
<<<<<<< HEAD
            <AddDokter isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
            <EditDokter isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} dokter={selectedDoctor} onSave={handleSave} />
            <HapusDokter
=======
            <ModalAdd isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
            <ModalEdit isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} dokter={selectedDoctor} onSave={handleSave} />
            <ModalHapus
>>>>>>> 73d4460f2b743fe6fdd8d0b715f41ff55ade6960
                isOpen={isHapusOpen}
                onClose={() => setIsHapusOpen(false)}
                onConfirm={handleConfirmDelete}
                nama={selectedDoctor?.nama_dokter}
            />
        </div>
    );
};

<<<<<<< HEAD
export default DokterList;
=======
export default DokterList;
>>>>>>> 73d4460f2b743fe6fdd8d0b715f41ff55ade6960
