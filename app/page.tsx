import { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import "./landing.css";
import "./layout";

const features = 
[
    { 
        id: "eye-control",
        name: "Kontrol Mata",
        desc: "Teknologi pelacakan mata yang memungkinkan pengguna menulis kode hanya dengan gerakan mata mereka."
    },
    {
        id: "voice-control",
        name: "Kontrol Suara",
        desc: "Sistem pengenalan suara canggih yang menerjemahkan perintah verbal menjadi kode yang dapat dieksekusi."
    },
    {
        id: "structured-curriculum",
        name: "Kurikulum Terstruktur",
        desc: "Materi pembelajaran yang disesuaikan dengan kebutuhan dan kemampuan setiap pengguna."
    }
]

const howItWorks = [
    {
        name: "Kalibrasi",
        desc: "Sesuaikan sistem dengan gerakan mata atau suara Anda dalam waktu kurang dari satu menit.",
        icon: "\ueef9"
    },
    {
        name: "Belajar",
        desc: "Ikuti kurikulum yang dipersonalisasi sesuai dengan kebutuhan dan level pemahaman Anda.",
        icon: "\ued7e"
    },
    {
        name: "Berkreasi",
        desc: "Mulai membuat proyek Anda sendiri dengan alat yang inklusif dan mendukung.",
        icon: "\uf018"
    }
]

const testimonials = [
    {
        name: "Andi Setiawan",
        job: "Pengembang Web",
        review: "Codi telah mengubah hidup saya. Saya tidak pernah membayangkan bisa menjadi programmer dengan kondisi fisik saya, tapi sekarang saya bisa membuat website sendiri."
    },
    {
        name: "Dina Pratiwi",
        job: "Mahasiswa Teknik",
        review: "Dengan kontrol suara di Codi, saya bisa mengerjakan tugas pemrograman saya tanpa bantuan orang lain. Ini sangat membebaskan!"
    },
    {
        name: "Budi Santoso",
        job: "Guru TIK",
        review: "Codi membuka peluang baru bagi siswa saya yang memiliki keterbatasan motorik. Mereka sekarang bisa berpartisipasi penuh dalam kelas pemrograman."
    },
    {
      name: "Siti Khadijah",
      job: "Ibu Rumah Tangga",
      review: "Awalnya saya cuma bantu anak belajar, tapi sekarang saya sendiri jadi tertarik coding. Codi bikin semuanya terasa mungkin."
    },
    {
      name: "Rian Maulana",
      job: "Pelajar SMA",
      review: "Saya pernah patah semangat karena susah ngetik. Tapi Codi bikin saya semangat lagi buat belajar Java dan Python!"
    },
    {
      name: "Lukas Jonathan",
      job: "Desainer Grafis",
      review: "Saya bukan programmer, tapi dengan Codi saya bisa bikin prototipe web tanpa ribet. Apalagi bisa dikontrol pakai suara, praktis banget."
    },
    {
      name: "Mega Puspita",
      job: "Pengusaha Online",
      review: "Saya pakai Codi buat belajar bikin toko online sendiri. Sekarang ga perlu bayar mahal ke developer. Mandiri itu enak!"
    },
    {
      name: "Hendra Wijaya",
      job: "Mahasiswa Difabel Netra",
      review: "Codi sangat membantu karena antarmukanya bisa dikontrol suara. Saya bisa belajar tanpa harus selalu tergantung pembaca layar."
    },
    {
      name: "Yohana Fransisca",
      job: "Pustakawan",
      review: "Codi adalah jembatan buat saya yang gaptek. Sekarang saya bisa bikin blog pribadi dengan coding yang saya pelajari sendiri."
    },
    {
      name: "Taufik Rahman",
      job: "Freelancer",
      review: "Setelah kecelakaan saya sempat ga yakin bisa kerja lagi. Tapi Codi ngajarin saya cara baru buat tetap produktif lewat programming."
    }
]

const pricing = [
    {
        name: "Basic",
        desc: "Untuk pemula",
        price: "0",
        features: [
            "Akses ke 5 modul dasar",
            "Kontrol dasar mata dan suara",
            "Forum komunitas"
        ],
        cta: "Daftar Sekarang"
    },
    {
        name: "Pro",
        desc: "Untuk individu serius",
        price: "199k",
        features: [
            "Akses ke semua modul dasar",
            "Kontrol premium mata dan suara",
            "Sesi mentoring bulanan",,
            "Proyek portofolio"
        ],
        cta: "Berlangganan Sekarang"
    },
    {
        name: "Enterprise",
        desc: "Untuk institusi",
        price: "???",
        features: [
            "Semua fitur Pro",
            "Dashboard admin",
            "Akses API",
            "Dukungan 24/7"
        ],
        cta: "Hubungi Kami"
    }
]

const element = (
<Fragment>
    <header id="Header" className="titlebar">
        <div className="logo">
            <Image src="/favicon.ico" alt="Logo Codi" width={128} height={128}/>
            <span>Codi</span>
        </div>
        <nav>
            <a ad-name="features">Fitur</a>
            <a ad-name="how-it-works">Cara Kerja</a>
            <a ad-name="testimonials">Testimoni</a>
            <a ad-name="pricing">Harga</a>
            <a ad-name="start-now">Mulai Gratis</a>
            <button ad-goto="signin" className="accent">
                <span>Masuk</span> 
                <span className="icon">&#xf9f6;</span>
            </button>
        </nav>
    </header>
    <section className="root">
        <div className="main">
            <section id="welcome"> 
                <div className="title">
                    <span>Belajar Pemrograman Tanpa</span>
                    <span className="gradient">Batasan</span>
                </div>

                <div className="text">
                    Platform pemrograman inklusif dengan teknologi kontrol mata dan suara
                    untuk membantu penyandang disabilitas motorik mengakses dunia coding.
                </div>

                <div className="buttons">
                    <button className="accent">
                        <span>Lihat Demo</span>
                        <span className="icon">&#xf8ac;</span>
                    </button>
                    <button className="plain">
                        <span>Pelajari Lebih Lanjut </span>
                        <span className="icon">&#xef59;</span>
                    </button>
                </div>
            </section>

            <section id="features"> 
                <h3>Fitur Utama</h3>
                <div className="text">Platform pemrograman yang dirancang untuk aksesibilitas</div>
                <div id="Grid_Features">
                    <div className="navigation">
                        {
                            features.map(feature => (
                                <div ad-name={feature.id} key={feature.id}>
                                    <div className="name">{feature.name}</div>
                                    <div className="desc">{feature.desc}</div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="content">
                        {
                            features.map(feature => (
                                <div ad-name={feature.id} key={feature.id}>
                                    <div className="name">{feature.name}</div>
                                    <div className="desc">{feature.desc}</div>
                                    <Image src={"/assets/features/" + feature.id + ".png"} alt={"Illustrasi " + feature.name } width={900} height={720}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            
            <section id="how-it-works"> 
                <h3>Cara Kerja</h3>
                <div className="text">Proses sederhana untuk memulai perjalanan coding Anda</div>

                <div id="Grid_HowItWorks">
                    <div className="container">
                        {
                            howItWorks.map(step => (
                                <div className="step" key={Math.random()}>
                                    <div className="name">{step.name}</div>
                                    <div className="desc">{step.desc}</div>
                                    <div className="icon">{step.icon}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            
            <section id="testimonials"> 
                <h3>Testimoni</h3>
                <div className="text">Apa kata mereka tentang Codi</div>

                <div id="Grid_Testimonials">
                    <div className="container">
                        {
                            testimonials.map(testimony => (
                                <div key={Math.random()} className="testimony">
                                    <div className="review">{testimony.review}</div>
                                    <div className="name">{testimony.name}</div>
                                    <div className="job">{testimony.job}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section id="pricing"> 
                <h3>Paket Harga</h3>
                <div className="text">Pilih paket yang sesuai dengan kebutuhan Anda</div>
                
                <div id="Grid_Pricing">
                    <div className="container">
                        {
                            pricing.map(data => (
                                <div key={Math.random()} className="pricing">
                                    <div className="name">{data.name}</div>
                                    <div className="desc">{data.desc}</div>
                                    <div className="price">{data.price}</div>
                                    <div className="features">
                                        {
                                            data.features.map(feature => (
                                                <div key={Math.random()}>{feature}</div>
                                            ))
                                        }
                                    </div>
                                    <button className="cta accent">{data.cta}</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            <section id="start-now"> 
                <div className="title">Siap mencoba Codi?</div>
                <div className="text">Mulai perjalanan coding Anda sekarang.</div>
                <div className="text">Daftar untuk uji coba gratis atau jadwalkan demo.</div>

                <div className="buttons">
                    <button className="accent" ad-goto="signup">
                        <span>Daftar Gratis</span>
                        <span className="icon">&#xeb57;</span>
                    </button>
                    <button className="plain">
                        <span>Jadwalkan Demo</span>
                    </button>
                </div>
            </section>
        </div>
        <script src="./landing.js"/>
    </section>
</Fragment>
)

export const metadata: Metadata = 
{
    title: "Codi - Platform Belajar Pemrograman Inklusif",
    description: "Platform belajar pemrograman untuk disabilitas motorik dengan kontrol mata/suara"
};

export default function Home() {
    return element;
}
