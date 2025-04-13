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
            <a>Testimoni</a>
            <a>Harga</a>
            <a ad-name="start-now">Mulai Gratis</a>
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
