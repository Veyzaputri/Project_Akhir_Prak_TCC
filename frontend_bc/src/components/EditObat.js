import React, { useState, useEffect } from "react";

const EditObat = ({ isOpen, onClose, onSave, obat }) => {
    const [formData, setFormData] = useState({
        nama_obat: "",
        definisi: "",
        efek_samping: "",
        harga: "",
    });

    useEffect(() => {
        if (obat) {
            setFormData({
                nama_obat: obat.nama_obat,
                definisi: obat.definisi,
                efek_samping: obat.efek_samping,
                harga: obat.harga,
            });
        }
    }, [obat]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...obat, ...formData });
    };

    if (!isOpen || !obat) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-warning-light">
                    <p className="modal-card-title has-text-dark">Edit Obat</p>
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
                        <button type="submit" className="button is-warning mr-2">Simpan</button>
                        <button type="button" className="button" onClick={onClose}>Batal</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

<<<<<<< HEAD
export default EditObat;
=======
export default EditObat;
>>>>>>> 73d4460f2b743fe6fdd8d0b715f41ff55ade6960
