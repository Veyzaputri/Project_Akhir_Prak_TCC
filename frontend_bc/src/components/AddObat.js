import React, { useState } from "react";

const AddObat = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        nama_obat: "",
        definisi: "",
        efek_samping: "",
        harga: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ nama_obat: "", definisi: "", efek_samping: "", harga: "" }); // reset form
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-primary-light">
                    <p className="modal-card-title has-text-primary-dark">Tambah Obat</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <form onSubmit={handleSubmit}>
                    <section className="modal-card-body">
                        <div className="field mb-3">
                            <label className="label">Nama Obat</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="nama_obat"
                                    className="input"
                                    value={formData.nama_obat}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field mb-3">
                            <label className="label">Definisi</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="definisi"
                                    className="input"
                                    value={formData.definisi}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field mb-3">
                            <label className="label">Efek Samping</label>
                            <div className="control">
                                <input
                                    type="text"
                                    name="efek_samping"
                                    className="input"
                                    value={formData.efek_samping}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field mb-3">
                            <label className="label">Harga</label>
                            <div className="control">
                                <input
                                    type="number"
                                    name="harga"
                                    className="input"
                                    value={formData.harga}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" className="button is-primary mr-2">Tambah</button>
                        <button type="button" className="button" onClick={onClose}>Batal</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default AddObat;
