import { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import "./style.css";

const element = (
<Fragment>
    <section className="root">
        <div className="main">
            <div className="panel" ad-theme="light">
            <Image src="/assets/logo_text.png" alt="Logo Codi" width={640} height={190}/>
                <div className="title">Bergabung bersama Codi</div>
                <div className="subtitle">Daftar platform belajar pemrograman untuk semua.</div>
                <div className="inputs">
                    <label className="InputContainer_Textbox">
                        <input id="Input_Email" ad-text="Email" type="email" name="email" placeholder="Email" ad-abortstyle="true"/>
                        <span>Email</span>
                    </label>
                    <span className="error" id="Text_ErrorEmail">Masukkan email yang valid.</span>
                    <label className="InputContainer_Textbox">
                        <input id="Input_Fullname" ad-text="Nama lengkap" type="text" name="fullname" placeholder="Nama lengkap" ad-abortstyle="true"/>
                        <span>Nama lengkap</span>
                    </label>
                    <label className="InputContainer_Textbox">
                        <input id="Input_Password" ad-text="Kata sandi" type="password" name="password" placeholder="Kata sandi" ad-abortstyle="true"/>
                        <span>Kata sandi</span>
                    </label>
                    <span className="error" id="Text_ErrorPassword">Kata sandi harus setidaknya sebanyak 8 karakter, termasuk huruf, angka, dan simbol.</span>
                    <span className="error" id="Text_ErrorPasswordSpace">Kata sandi tidak boleh diawali atau diakhiri dengan spasi.</span>
                    <label className="InputContainer_Textbox">
                        <input id="Input_ConfirmPassword" ad-text="Konfirmasi kata sandi" type="password" name="confirmpassword" placeholder="Konfirmasi kata sandi" ad-abortstyle="true"/>
                        <span>Konfirmasi kata sandi</span>
                    </label>
                    <span className="error" id="Text_ErrorConfirmPassword">Kata sandi yang dikonfirmasi tidak sama dengan di atas.</span>
                    <span className="error" id="Text_ErrorSignUp"></span>
                    <div className="buttons">
                        <button className="accent" id="Button_SignUp" disabled>
                            <div className="progressring" ad-abortstyle="true">
                                <div className="container">
                                    <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                                </div>
                            </div>
                            <span>Daftar</span>
                        </button>
                        <div className="offersignup">
                            <span>Sudah punya akun?</span>
                            <a className="link" id="Button_SignIn" ad-goto="/signin">
                                <span>Masuk</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="./signup.js"/>
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
