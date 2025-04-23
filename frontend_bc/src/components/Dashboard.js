import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Dashboard() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/");
        }
    }, [navigate]);

    const mainSections = [
        {
            title: "Profil",
            text: "“Harmoni” merujuk pada hubungan yang seimbang antara pikiran, tubuh, dan emosi seseorang dalam mencapai kesehatan mental. “Sejahtera” memiliki arti bahwa tujuan utamanya untuk memastikan kesejahteraan mental pasien. Jadi 'Harmoni Sejahtera Mental Hospital' memiliki arti sebagai rumah sakit."
        },
        {
            title: "Tentang",
            text: "Selamat datang di Harmoni Sejahtera Mental Hospital, tempat di mana kami berkomitmen untuk memberikan perawatan terbaik untuk kesehatan mental Anda. Sebagai pusat kesehatan mental terkemuka, kami memahami bahwa setiap individu memiliki perjuangan dan kebutuhan yang unik."
        },
        {
            title: "Visi & Misi",
            text: "Menjadi pusat kesehatan jiwa terkemuka yang mendukung penyembuhan holistik bagi setiap individu dan masyarakat."
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="container is-fluid has-background-light pb-6">
            {/* Navbar */}
            <header className="navbar is-white is-fixed-top px-5" aria-label="Main Navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="/logo-rsj.png" alt="Logo RSJ" style={{ height: "100px" }} />
                        <span className="ml-2 has-text-weight-bold has-text-link">Harmoni Sejahtera</span>
                    </a>
                </div>
                <div className="navbar-end">
                    {["Dokter", "Pasien", "History Pasien"].map((item) => (
                        <a
                            key={item}
                            onClick={() => navigate(`/${item.toLowerCase().replace(" ", "")}`)}
                            className="navbar-item is-size-6 has-text-grey-dark"
                            style={{ cursor: "pointer" }}
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        className="navbar-item is-size-6 has-text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowLogoutModal(true)}
                    >
                        Logout
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="hero is-medium is-link is-bold mt-6"
                style={{
                    backgroundImage: 'url("/bg-dashboard.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                    padding: "0 2rem"
                }}
            >
                <div
                    style={{
                        backgroundColor: "black", // pastikan ini solid
                        color: "white", // pastikan teks jelas
                        padding: "2rem",
                        borderRadius: "10px",
                        maxWidth: "550px",
                        position: "absolute",
                        left: "2rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        textAlign: "left"
                    }}
                >
                    <h1 className="title is-3">Selamat Datang</h1>
                    <p className="subtitle is-5 mt-3">
                        Kami akan memberikan pelayanan terbaik untuk kesehatan mental Anda dengan pendekatan holistik dan penuh empati.
                    </p>
                </div>
            </section>


            {/* Kontak Kami */}
            <section className="section py-5">
                <div className="box">
                    <h2 className="title is-5 has-text-link">Kontak Kami</h2>
                    <div className="columns is-mobile">
                        <div className="column is-narrow is-flex is-align-items-center">
                            <PhoneIcon style={{ height: "1.25em", width: "1.25em", color: "black" }} />
                            <span className="ml-2 is-size-6">021-1234567</span>
                        </div>
                        <div className="column is-narrow is-flex is-align-items-center">
                            <MapPinIcon style={{ height: "1.25em", width: "1.25em", color: "black" }} />
                            <span className="ml-2 is-size-6">Jl. Sehat No.10, Jakarta</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Section */}
            <section className="section">
                <div className="columns is-multiline">
                    {mainSections.map(({ title, text }) => (
                        <div className="column is-one-third" key={title}>
                            <div className="box is-flex is-flex-direction-column is-fullheight" style={{ height: "100%" }}>
                                <h2 className="title is-5 has-text-link">{title}</h2>
                                <p className="is-size-6">{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lokasi Kami */}
            <section className="section">
                <h2 className="title is-5 has-text-link">Lokasi Kami</h2>
                <div className="box">
                    <iframe
                        src="https://www.google.com/maps/embed?...etc..."
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="map"
                    ></iframe>
                </div>
            </section>

            {/* Modal Logout */}
            {showLogoutModal && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => setShowLogoutModal(false)}></div>
                    <div className="modal-content box">
                        <p className="is-size-5 mb-3">Apakah Anda ingin logout?</p>
                        <div className="buttons is-right">
                            <button className="button" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                            <button className="button is-danger" onClick={handleLogout}>Ya</button>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => setShowLogoutModal(false)}></button>
                </div>
            )}
        </div>
    );
}
