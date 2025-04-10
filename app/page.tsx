"use client"
import Head from "next/head"
import { useState } from "react"
import { Code, Eye, Mic, ChevronRight, User, BookOpen } from "lucide-react"

export default function Home() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100">
			<Head>
				<title>Codi | Platform Belajar Pemrograman Inklusif</title>
				<meta
					name="description"
					content="Platform belajar pemrograman untuk disabilitas motorik dengan kontrol mata/suara"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* Navigation */}
			<nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0 flex items-center">
								<Code className="h-8 w-8 text-blue-500" />
								<span className="ml-2 text-xl font-bold">Codi</span>
							</div>
							<div className="hidden md:ml-6 md:flex md:space-x-8">
								<a
									href="#features"
									className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
									Fitur
								</a>
								<a
									href="#how-it-works"
									className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
									Cara Kerja
								</a>
								<a
									href="#testimonials"
									className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
									Testimoni
								</a>
								<a
									href="#pricing"
									className="text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
									Harga
								</a>
							</div>
						</div>
						<div className="hidden md:flex items-center">
							<a
								href="#contact"
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
								Mulai Gratis
							</a>
						</div>
						<div className="flex items-center md:hidden">
							<button
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
								<svg
									className="h-6 w-6"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24">
									{isMenuOpen ? (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										/>
									) : (
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									)}
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<a
								href="#features"
								className="text-gray-300 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
								Fitur
							</a>
							<a
								href="#how-it-works"
								className="text-gray-300 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
								Cara Kerja
							</a>
							<a
								href="#testimonials"
								className="text-gray-300 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
								Testimoni
							</a>
							<a
								href="#pricing"
								className="text-gray-300 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium">
								Harga
							</a>
							<a
								href="#contact"
								className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium">
								Mulai Gratis
							</a>
						</div>
					</div>
				)}
			</nav>

			{/* Hero Section */}
			<section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24">
				<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold tracking-tight">
							Belajar Pemrograman Tanpa{" "}
							<span className="text-blue-500">Batasan</span>
						</h1>
						<p className="mt-6 text-xl text-gray-400">
							Platform pemrograman inklusif dengan teknologi kontrol mata dan
							suara untuk membantu penyandang disabilitas motorik mengakses
							dunia coding.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4">
							<a
								href="#demo"
								className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-center font-medium flex items-center justify-center">
								Lihat Demo
								<ChevronRight className="ml-2 h-5 w-5" />
							</a>
							<a
								href="#how-it-works"
								className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md text-center font-medium">
								Pelajari Lebih Lanjut
							</a>
						</div>
						<div className="mt-8 flex items-center text-sm text-gray-400">
							<div className="flex -space-x-2">
								<div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
									<User className="h-4 w-4 text-white" />
								</div>
								<div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
									<User className="h-4 w-4 text-white" />
								</div>
								<div className="h-8 w-8 rounded-full bg-blue-700 flex items-center justify-center">
									<User className="h-4 w-4 text-white" />
								</div>
							</div>
							<span className="ml-4">
								Bergabung dengan 500+ pengguna di Indonesia
							</span>
						</div>
					</div>
					<div className="relative">
						<div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-xl">
							<div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
								<div className="flex space-x-2 mb-2">
									<div className="h-3 w-3 rounded-full bg-red-500"></div>
									<div className="h-3 w-3 rounded-full bg-yellow-500"></div>
									<div className="h-3 w-3 rounded-full bg-green-500"></div>
								</div>
								<pre className="font-mono text-sm text-gray-300 overflow-x-auto p-2">
									<code>
										<span className="text-purple-400">function</span>{" "}
										<span className="text-blue-400">sayHello</span>() {"{"}
										<span className="text-purple-400">const</span>{" "}
										<span className="text-blue-400">message</span> ={" "}
										<span className="text-green-400">
											Selamat datang di Codi!
										</span>
										;<span className="text-purple-400">console</span>.
										<span className="text-blue-400">log</span>(message);
										<span className="text-purple-400">return</span> message;
										{"}"}
										<span className="text-green-400">
											Kontrol dengan mata atau suara
										</span>
										<span className="text-blue-400">sayHello</span>();
									</code>
								</pre>
							</div>
							<div className="mt-4 flex justify-between items-center px-2">
								<div className="flex items-center">
									<Eye className="h-5 w-5 text-blue-400 mr-2" />
									<span className="text-sm text-gray-400">Kontrol Mata</span>
								</div>
								<div className="flex items-center">
									<Mic className="h-5 w-5 text-blue-400 mr-2" />
									<span className="text-sm text-gray-400">Kontrol Suara</span>
								</div>
							</div>
						</div>
						<div className="absolute -z-10 w-full h-full bg-blue-500 blur-3xl opacity-20 -bottom-8 -right-8 rounded-full"></div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="py-16 bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold">Fitur Utama</h2>
						<p className="mt-4 text-xl text-gray-400">
							Platform pemrograman yang dirancang untuk aksesibilitas
						</p>
					</div>

					<div className="mt-16 grid gap-8 md:grid-cols-3">
						{/* Feature 1 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
							<div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-5">
								<Eye className="h-6 w-6 text-blue-500" />
							</div>
							<h3 className="text-xl font-bold mb-3">Kontrol Mata</h3>
							<p className="text-gray-400">
								Teknologi pelacakan mata yang memungkinkan pengguna menulis kode
								hanya dengan gerakan mata mereka.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
							<div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-5">
								<Mic className="h-6 w-6 text-blue-500" />
							</div>
							<h3 className="text-xl font-bold mb-3">Kontrol Suara</h3>
							<p className="text-gray-400">
								Sistem pengenalan suara canggih yang menerjemahkan perintah
								verbal menjadi kode yang dapat dieksekusi.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
							<div className="h-12 w-12 bg-blue-900/30 rounded-lg flex items-center justify-center mb-5">
								<BookOpen className="h-6 w-6 text-blue-500" />
							</div>
							<h3 className="text-xl font-bold mb-3">Kurikulum Terstruktur</h3>
							<p className="text-gray-400">
								Materi pembelajaran yang disesuaikan dengan kebutuhan dan
								kemampuan setiap pengguna.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section id="how-it-works" className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold">Cara Kerja</h2>
						<p className="mt-4 text-xl text-gray-400">
							Proses sederhana untuk memulai perjalanan coding Anda
						</p>
					</div>

					<div className="mt-16 grid gap-12 md:grid-cols-3">
						{/* Step 1 */}
						<div className="text-center">
							<div className="mx-auto h-16 w-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-5 relative">
								<span className="text-2xl font-bold text-blue-500">1</span>
								<div className="absolute hidden md:block top-8 -right-1/2 h-0.5 w-full bg-gradient-to-r from-blue-500 to-transparent"></div>
							</div>
							<h3 className="text-xl font-bold mb-3">Kalibrasi</h3>
							<p className="text-gray-400">
								Sesuaikan sistem dengan gerakan mata atau suara Anda dalam waktu
								kurang dari satu menit.
							</p>
						</div>

						{/* Step 2 */}
						<div className="text-center">
							<div className="mx-auto h-16 w-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-5 relative">
								<span className="text-2xl font-bold text-blue-500">2</span>
								<div className="absolute hidden md:block top-8 -right-1/2 h-0.5 w-full bg-gradient-to-r from-blue-500 to-transparent"></div>
							</div>
							<h3 className="text-xl font-bold mb-3">Belajar</h3>
							<p className="text-gray-400">
								Ikuti kurikulum yang dipersonalisasi sesuai dengan kebutuhan dan
								level pemahaman Anda.
							</p>
						</div>

						{/* Step 3 */}
						<div className="text-center">
							<div className="mx-auto h-16 w-16 bg-blue-900/30 rounded-full flex items-center justify-center mb-5">
								<span className="text-2xl font-bold text-blue-500">3</span>
							</div>
							<h3 className="text-xl font-bold mb-3">Berkreasi</h3>
							<p className="text-gray-400">
								Mulai membuat proyek Anda sendiri dengan alat yang inklusif dan
								mendukung.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section id="testimonials" className="py-16 bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold">Testimoni Pengguna</h2>
						<p className="mt-4 text-xl text-gray-400">
							Apa kata mereka tentang Codi
						</p>
					</div>

					<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{/* Testimonial 1 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
							<div className="flex items-center mb-4">
								<div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center">
									<User className="h-6 w-6 text-blue-200" />
								</div>
								<div className="ml-4">
									<h4 className="font-bold">Andi Setiawan</h4>
									<p className="text-sm text-gray-400">Developer Web</p>
								</div>
							</div>
							<p className="text-gray-300">
								Codi telah mengubah hidup saya. Saya tidak pernah membayangkan
								bisa menjadi programmer dengan kondisi fisik saya, tapi sekarang
								saya bisa membuat website sendiri.
							</p>
						</div>

						{/* Testimonial 2 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
							<div className="flex items-center mb-4">
								<div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center">
									<User className="h-6 w-6 text-blue-200" />
								</div>
								<div className="ml-4">
									<h4 className="font-bold">Dina Pratiwi</h4>
									<p className="text-sm text-gray-400">Mahasiswa Teknik</p>
								</div>
							</div>
							<p className="text-gray-300">
								Dengan kontrol suara di Codi, saya bisa mengerjakan tugas
								pemrograman saya tanpa bantuan orang lain. Ini sangat
								membebaskan!
							</p>
						</div>

						{/* Testimonial 3 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
							<div className="flex items-center mb-4">
								<div className="h-12 w-12 rounded-full bg-blue-800 flex items-center justify-center">
									<User className="h-6 w-6 text-blue-200" />
								</div>
								<div className="ml-4">
									<h4 className="font-bold">Budi Santoso</h4>
									<p className="text-sm text-gray-400">Guru TIK</p>
								</div>
							</div>
							<p className="text-gray-300">
								Codi membuka peluang baru bagi siswa saya yang memiliki
								keterbatasan motorik. Mereka sekarang bisa berpartisipasi penuh
								dalam kelas pemrograman.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing */}
			<section id="pricing" className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold">Paket Harga</h2>
						<p className="mt-4 text-xl text-gray-400">
							Pilih paket yang sesuai dengan kebutuhan Anda
						</p>
					</div>

					<div className="mt-16 grid gap-8 md:grid-cols-3">
						{/* Pricing 1 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
							<h3 className="text-xl font-bold mb-2">Gratis</h3>
							<p className="text-gray-400 mb-4">Untuk pemula</p>
							<div className="mb-6">
								<span className="text-4xl font-bold">Rp 0</span>
								<span className="text-gray-400">/bulan</span>
							</div>
							<ul className="space-y-3 mb-8">
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Akses ke 5 modul dasar</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Kontrol mata & suara basic</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Forum komunitas</span>
								</li>
							</ul>
							<a
								href="#register"
								className="block w-full bg-gray-800 hover:bg-gray-700 text-center py-3 rounded-md font-medium">
								Daftar Sekarang
							</a>
						</div>

						{/* Pricing 2 */}
						<div className="bg-gray-900 rounded-xl p-6 border-2 border-blue-500 transform md:-translate-y-4 relative">
							<div className="absolute -top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
								Populer
							</div>
							<h3 className="text-xl font-bold mb-2">Pro</h3>
							<p className="text-gray-400 mb-4">Untuk individu serius</p>
							<div className="mb-6">
								<span className="text-4xl font-bold">Rp 199k</span>
								<span className="text-gray-400">/bulan</span>
							</div>
							<ul className="space-y-3 mb-8">
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Akses ke semua modul</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Kontrol mata & suara premium</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Sesi mentoring bulanan</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Proyek portofolio</span>
								</li>
							</ul>
							<a
								href="#register-pro"
								className="block w-full bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-md font-medium">
								Berlangganan Sekarang
							</a>
						</div>

						{/* Pricing 3 */}
						<div className="bg-gray-900 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
							<h3 className="text-xl font-bold mb-2">Enterprise</h3>
							<p className="text-gray-400 mb-4">Untuk institusi</p>
							<div className="mb-6">
								<span className="text-4xl font-bold">Hubungi</span>
								<span className="text-gray-400"> kami</span>
							</div>
							<ul className="space-y-3 mb-8">
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Semua fitur Pro</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Dashboard admin</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>API akses</span>
								</li>
								<li className="flex items-center">
									<svg
										className="h-5 w-5 text-blue-500 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Dukungan 24/7</span>
								</li>
							</ul>
							<a
								href="#contact-sales"
								className="block w-full bg-gray-800 hover:bg-gray-700 text-center py-3 rounded-md font-medium">
								Hubungi Kami
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section id="demo" className="py-16 bg-gray-800">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl font-bold mb-6">Siap Mencoba Codi?</h2>
					<p className="text-xl text-gray-400 mb-8">
						Mulai perjalanan coding Anda sekarang. Daftar untuk uji coba gratis
						atau jadwalkan demo.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<a
							href="#register"
							className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium">
							Daftar Gratis
						</a>
						<a
							href="#schedule-demo"
							className="bg-gray-900 hover:bg-gray-700 text-white px-8 py-3 rounded-md font-medium">
							Jadwalkan Demo
						</a>
					</div>
				</div>
			</section>

			<footer className="bg-gray-900 pt-16 pb-8 border-t border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid gap-8 md:grid-cols-4">
						{/* Company Info */}
						<div className="md:col-span-1">
							<div className="flex items-center mb-4">
								<Code className="h-8 w-8 text-blue-500" />
								<span className="ml-2 text-xl font-bold">Codi</span>
							</div>
							<p className="text-gray-400 mb-6">
								Platform belajar pemrograman inklusif untuk semua kemampuan.
							</p>
							<div className="flex space-x-4">
								<a href="#" className="text-gray-400 hover:text-blue-500">
									<span className="sr-only">Facebook</span>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24">
										<path
											fillRule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clipRule="evenodd"
										/>
									</svg>
								</a>
								{/* Add other social icons here */}
							</div>
						</div>

						{/* Product Links */}
						<div className="md:text-center">
							<h4 className="text-sm font-semibold mb-4">Produk</h4>
							<ul className="space-y-2">
								<li>
									<a
										href="#features"
										className="text-gray-400 hover:text-blue-500">
										Fitur
									</a>
								</li>
								<li>
									<a
										href="#pricing"
										className="text-gray-400 hover:text-blue-500">
										Harga
									</a>
								</li>
								<li>
									<a href="#demo" className="text-gray-400 hover:text-blue-500">
										Demo
									</a>
								</li>
								<li>
									<a
										href="#status"
										className="text-gray-400 hover:text-blue-500">
										Status
									</a>
								</li>
							</ul>
						</div>
					</div>

					{/* Copyright Section */}
					<div className="mt-8 pt-8 border-t border-gray-800 text-center">
						<p className="text-gray-400 text-sm">
							&copy; {new Date().getFullYear()} Codi. All rights reserved.
						</p>
						<div className="mt-2">
							<a
								href="#privacy"
								className="text-gray-400 hover:text-blue-500 text-sm mx-4">
								Kebijakan Privasi
							</a>
							<a
								href="#terms"
								className="text-gray-400 hover:text-blue-500 text-sm mx-4">
								Syarat Penggunaan
							</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
