import React from "react";

const ModalHapus = ({ isOpen, onClose, onConfirm, nama }) => {
    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head has-background-danger-light">
                    <p className="modal-card-title has-text-danger-dark">Konfirmasi Hapus</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <p>Apakah kamu yakin ingin menghapus <strong>{nama}</strong> dari daftar dokter?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger mr-2" onClick={onConfirm}>Ya, Hapus</button>
                    <button className="button" onClick={onClose}>Batal</button>
                </footer>
            </div>
        </div>
    );
};

export default ModalHapus;
