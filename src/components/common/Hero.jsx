import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
    const backgrounds = [
        "/images/bg1.webp",
        "/images/bg2.webp",
        "/images/bg3.webp",
        "/images/bg4.webp"
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((current) => {
                return (
                    (current + 1) %
                    backgrounds.length
                );
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    return (
        <section className="relative min-h-[620px] overflow-hidden">

            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(15, 23, 42, 0.72),
                            rgba(15, 23, 42, 0.72)
                        ),
                        url(${backgrounds[currentSlide]})
                    `
                }}
            />

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-20">

                <div className="max-w-3xl text-white">

                    <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-cyan-300 backdrop-blur-md">
                        PERPUSTAKAAN DIGITAL
                    </span>

                    <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                        Temukan Buku
                        <span className="block text-cyan-400">
                            Favoritmu
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg">
                        Jelajahi koleksi buku dan temukan
                        berbagai sumber pengetahuan untuk
                        mendukung proses belajar dan
                        pengembangan diri.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">

                        <Link
                            to="/galeri"
                            className="rounded-xl bg-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-500/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-400"
                        >
                            Jelajahi Buku
                        </Link>

                        <Link
                            to="/contact"
                            className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
                        >
                            Hubungi Kami
                        </Link>

                    </div>

                </div>

            </div>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">

                {backgrounds.map(
                    (_, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() =>
                                setCurrentSlide(
                                    index
                                )
                            }
                            aria-label={`Slide ${index + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                currentSlide === index
                                    ? "w-8 bg-cyan-400"
                                    : "w-2.5 bg-white/50 hover:bg-white"
                            }`}
                        />
                    )
                )}

            </div>

        </section>
    );
}

export default Hero;