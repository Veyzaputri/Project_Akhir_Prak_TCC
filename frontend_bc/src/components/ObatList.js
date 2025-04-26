import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, PlusIcon, HomeIcon } from "@heroicons/react/24/outline";
import AddObat from "./AddObat";
import EditObat from "./EditObat";
import HapusObat from "./HapusObat";

const ObatList = () => {
    const navigate = useNavigate();
    const [obat, setObat] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isHapusOpen, setIsHapusOpen] = useState(false);
    const [selectedObat, setSelectedObat] = useState(null);

    useEffect(() => {
        const fetchObat = async () => {
            try {
                const response = await fetch("http://localhost:5000/obat");
                const data = await response.json();
                setObat(data);
            } catch (error) {
                console.error("Gagal mengambil data obat:", error);
            }
        };

        fetchObat();
    }, []);

    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    const handleEdit = (item) => {
        setSelectedObat(item);
        setIsEditOpen(true);
    };

    const handleDelete = (item) => {
        setSelectedObat(item);
        setIsHapusOpen(true);
    };

    const handleAdd = async (formData) => {
        try {
            const response = await fetch("http://localhost:5000/add-obat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const newItem = await response.json();
                setObat([...obat, newItem]);
                setIsAddOpen(false);
            } else {
                console.error("Gagal menambahkan obat");
            }
        } catch (error) {
            console.error("Error saat menambahkan obat:", error);
        }
    };

    const handleSave = async (formData) => {
        try {
            const response = await fetch(`http://localhost:5000/obat/${selectedObat.id_obat}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setObat(
                    obat.map((item) =>
                        item.id_obat === updatedItem.id_obat ? updatedItem : item
                    )
                );
                setIsEditOpen(false);
            } else {
                console.error("Gagal memperbarui obat");
            }
        } catch (error) {
            console.error("Error saat mengedit obat:", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/obat/${selectedObat.id_obat}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setObat(obat.filter((item) => item.id_obat !== selectedObat.id_obat));
                setIsHapusOpen(false);
            } else {
                console.error("Gagal menghapus obat");
            }
        } catch (error) {
            console.error("Error saat menghapus obat:", error);
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
                    <h1 className="title is-3">Daftar Obat</h1>
                </div>
                <div className="level-right">
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="button is-primary is-flex is-align-items-center"
                    >
                        <span className="icon is-small">
                            <PlusIcon className="h-5 w-5" />
                        </span>
                        <span>Tambah Obat</span>
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nama Obat</th>
                            <th>Definisi</th>
                            <th>Efek Samping</th>
                            <th>Harga</th>
                            <th className="has-text-centered">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {obat.length > 0 ? (
                            obat.map((item, index) => (
                                <tr key={item.id_obat}>
                                    <td>{index + 1}</td>
                                    <td>{item.nama_obat}</td>
                                    <td>{item.definisi}</td>
                                    <td>{item.efek_samping}</td>
                                    <td>{item.harga}</td>
                                    <td className="has-text-centered">
                                        <div className="buttons is-centered is-inline-flex">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="button is-small is-info"
                                                title="Edit"
                                            >
                                                <span className="icon is-small">
                                                    <PencilIcon className="h-4 w-4" />
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="button is-small is-danger"
                                                title="Hapus"
                                            >
                                                <span className="icon is-small">
                                                    <TrashIcon className="h-4 w-4" />
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="has-text-centered has-text-grey">
                                    Tidak ada data obat.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Components */}
            <AddObat isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onAdd={handleAdd} />
            <EditObat isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} obat={selectedObat} onSave={handleSave} />
            <HapusObat
                isOpen={isHapusOpen}
                onClose={() => setIsHapusOpen(false)}
                onConfirm={handleConfirmDelete}
                nama={selectedObat?.nama_obat}
            />
        </div>
    );
};

export default ObatList;
