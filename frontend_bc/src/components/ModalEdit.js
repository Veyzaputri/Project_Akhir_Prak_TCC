import React, { useState, useEffect } from "react";

const ModalEdit = ({ isOpen, onClose, onSave, dokter }) => {
    const [formData, setFormData] = useState({
        nama_dokter: "",
        spesialis: "",
    });

    useEffect(() => {
        if (dokter) {
            setFormData({
                nama_dokter: dokter.nama_dokter,
                spesialis: dokter.spesialis,
            });
        }
    }, [dokter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...dokter, ...formData });
    };

    if (!isOpen || !dokter) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-warning-light">
                    <p className="modal-card-title has-text-dark">Edit Dokter</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <form onSubmit={handleSubmit}>
                    <section className="modal-card-body">
                        <div className="field mb-3">
                            <label className="label">Nama Dokter</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="nama_dokter"
                                    className="input"
                                    value={formData.nama_dokter}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field mb-3">
                            <label className="label">Spesialis</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="spesialis"
                                    className="input"
                                    value={formData.spesialis}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" className="button is-warning mr-2">Simpan</button>
                        <button type="button" className="button" onClick={onClose}>Batal</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ModalEdit;
