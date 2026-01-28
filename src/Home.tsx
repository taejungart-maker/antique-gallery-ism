import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings, X, Lock, Mail, Search, Menu, Home as HomeIcon, Grid, User, Trash2 } from "lucide-react";

// 초기 작품 데이터
const INITIAL_ARTWORKS = [
    { id: 1, title: "Moon Jar", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBORJPYZTkODzsnEurF6evF_-wsqFrbqK8iUDY7P5an6CNATOx_n7PacQoCg2yONuzo-ac_CaqHEvz_uS1zTwM99EeyYU4oPXWBIDbmYjz9BUqmGSHwYihC_DVoGpCLixu_RLf4lCg2Ss-wF8ClVd2ttf7cJvuiT8WwtpL6hQnzIa4p2ivnPs4PcNnE_RMR3r_sGf670KzO1imlyYv4uM3OHJBFjssQWQW89I_qFdMULS9DArwwYilax75fPUIx0BGnDeI1ATkqEOGZ", span: "item-1x2" },
    { id: 2, title: "Ceramic Study", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6HTlho8iW1aBkHLfr4KLdR-5K88tQr6M9K4joXkn5GdtJtFuB3DvNUsxOQdX_ISdlFya4rkphJKUOOXs036TpJmfDAuUEc2fW4Vj25L70hfRG3O_ZDLIjkNJ7NyPkaHB81tw6GoUN9sQvj3hBVh2NBXddK1FkBGFuSJSbqFGMvfzieX6i6Iac943EPbhdNIjQar7lRM4LfvFMQgHa64mS7YXHY20ILdB-cyeD5fC9ytpozxy1zl1GsUmYmi4AIaJo4VsFNQEgZH7W", span: "item-1x1" },
    { id: 3, title: "Minimalist Piece", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMso44nyICisk8jF5UfjyG4fYLe3Cnxqw8HuUNUewhnvfbe0p76vEGP7wBvsL6uZuc7y7OsX3rubs5IYJlolIMC9TZ7o9WPNU4P8YCEDT9VCTfu_4eZ5qW-acpt4epsrGNKPMSRp6w9IkETP4cT7WJ94haDS7fSHb_K-Koj3V-SNrpNAfrfz5CmgfS8yl0XDzEFrXLEbGJn6nE_w-D0xGugHnFomVhEjrWdWBR4586RPJLqY05ACjLPkRuMJJnN5VJvPPKjXPweZbc", span: "item-1x1" },
    { id: 4, title: "Curated Collection", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBORJPYZTkODzsnEurF6evF_-wsqFrbqK8iUDY7P5an6CNATOx_n7PacQoCg2yONuzo-ac_CaqHEvz_uS1zTwM99EeyYU4oPXWBIDbmYjz9BUqmGSHwYihC_DVoGpCLixu_RLf4lCg2Ss-wF8ClVd2ttf7cJvuiT8WwtpL6hQnzIa4p2ivnPs4PcNnE_RMR3r_sGf670KzO1imlyYv4uM3OHJBFjssQWQW89I_qFdMULS9DArwwYilax75fPUIx0BGnDeI1ATkqEOGZ", span: "item-2x2" },
    { id: 5, title: "Modern Ceramic", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6HTlho8iW1aBkHLfr4KLdR-5K88tQr6M9K4joXkn5GdtJtFuB3DvNUsxOQdX_ISdlFya4rkphJKUOOXs036TpJmfDAuUEc2fW4Vj25L70hfRG3O_ZDLIjkNJ7NyPkaHB81tw6GoUN9sQvj3hBVh2NBXddK1FkBGFuSJSbqFGMvfzieX6i6Iac943EPbhdNIjQar7lRM4LfvFMQgHa64mS7YXHY20ILdB-cyeD5fC9ytpozxy1zl1GsUmYmi4AIaJo4VsFNQEgZH7W", span: "item-2x1" },
    { id: 6, title: "Form Study", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMso44nyICisk8jF5UfjyG4fYLe3Cnxqw8HuUNUewhnvfbe0p76vEGP7wBvsL6uZuc7y7OsX3rubs5IYJlolIMC9TZ7o9WPNU4P8YCEDT9VCTfu_4eZ5qW-acpt4epsrGNKPMSRp6w9IkETP4cT7WJ94haDS7fSHb_K-Koj3V-SNrpNAfrfz5CmgfS8yl0XDzEFrXLEbGJn6nE_w-D0xGugHnFomVhEjrWdWBR4586RPJLqY05ACjLPkRuMJJnN5VJvPPKjXPweZbc", span: "item-1x2" },
];

const Home = () => {
    const [artworks, setArtworks] = useState(INITIAL_ARTWORKS);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [language, setLanguage] = useState("EN");

    // 개별 삭제 기능
    const handleDelete = (id: number) => {
        if (window.confirm("정말로 이 작품을 아카이브에서 삭제하시겠습니까?")) {
            setArtworks(artworks.filter(art => art.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-background-light font-sans selection:bg-primary selection:text-white">
            {/* CSS Styles for Grid - Tailwind로 처리하기 어려운 복잡한 그리드 */}
            <style>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 160px;
          gap: 12px;
        }
        .item-1x1 { grid-column: span 1; grid-row: span 1; }
        .item-1x2 { grid-column: span 1; grid-row: span 2; }
        .item-2x1 { grid-column: span 2; grid-row: span 1; }
        .item-2x2 { grid-column: span 2; grid-row: span 2; }
        
        @media (min-width: 768px) {
          .masonry-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 200px;
          }
        }
      `}</style>

            {/* Top sticky Navigation */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 bg-background-light/90 backdrop-blur-md border-b border-black/5">
                <div className="flex items-center gap-4">
                    <p className="text-ink text-xs font-bold tracking-[0.2em] font-sans">
                        <span
                            className={`cursor-pointer transition-colors ${language === 'EN' ? 'text-primary' : 'text-gray-400 font-normal'}`}
                            onClick={() => setLanguage('EN')}
                        >EN</span>
                        <span className="text-gray-300 mx-2">|</span>
                        <span
                            className={`cursor-pointer transition-colors ${language === 'KR' ? 'text-primary' : 'text-gray-400 font-normal'}`}
                            onClick={() => setLanguage('KR')}
                        >KR</span>
                        <span className="text-gray-300 mx-2">|</span>
                        <span
                            className={`cursor-pointer transition-colors ${language === 'CN' ? 'text-primary' : 'text-gray-400 font-normal'}`}
                            onClick={() => setLanguage('CN')}
                        >CN</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="text-ink flex items-center justify-center hover:text-primary transition-colors h-10 w-10">
                        <Search size={22} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className={`text-ink flex items-center justify-center transition-colors h-10 w-10 rounded-full ${isAdmin ? 'bg-primary/20 text-primary' : 'hover:bg-gray-100'}`}
                        title={isAdmin ? "관리자 모드 끄기" : "관리자 모드 켜기"}
                    >
                        <Settings size={22} strokeWidth={2.5} />
                    </button>
                </div>
            </nav>

            {/* Header */}
            <header className="px-8 pt-12 pb-10 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-ink mb-3 tracking-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-ink to-primary">
                    YEHWA WORLD GALLERY
                </h1>
                <div className="w-12 h-0.5 bg-primary mx-auto mb-4"></div>
                <p className="text-[12px] md:text-sm text-gray-500 font-sans tracking-[0.4em] uppercase font-bold">
                    Digital Archiving Project & Culture Study
                </p>

                {/* Year Filter */}
                <div className="mt-10 flex justify-center space-x-6 text-[11px] font-bold tracking-widest uppercase text-gray-400">
                    <span className="text-ink border-b-2 border-primary pb-1 cursor-pointer">All Works</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">2026s</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">2020s</span>
                    <span className="hover:text-primary transition-colors cursor-pointer">Earlier</span>
                </div>
            </header>

            {/* Main Masonry Grid */}
            <main className="px-4 pb-32 max-w-7xl mx-auto">
                <div className="masonry-grid">
                    {artworks.map((art, idx) => (
                        <article
                            key={art.id}
                            className={`${art.span} group relative overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1`}
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div
                                className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${art.image})` }}
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                                <h2 className="text-white text-sm md:text-base font-bold leading-tight tracking-wide">{art.title}</h2>
                                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">Collector's Item</p>
                            </div>

                            {/* Admin: Individual Delete Button */}
                            {isAdmin && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(art.id); }}
                                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"
                                    aria-label="작품 삭제"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-t border-black/5 flex items-center justify-around px-4 pb-4 z-50">
                <div className="flex flex-col items-center gap-1 text-primary cursor-pointer group">
                    <div className="p-2 rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                        <HomeIcon size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">Archive</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors cursor-pointer group">
                    <Grid size={24} strokeWidth={2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Explore</span>
                </div>
                <div
                    onClick={() => setIsOverlayOpen(true)}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors cursor-pointer group"
                >
                    <User size={24} strokeWidth={2} />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
                </div>
            </nav>

            {/* Admin Menu Overlay */}
            {isOverlayOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="relative bg-[#1a1a1a] border border-white/10 rounded-3xl w-full max-w-sm p-8 shadow-2xl">
                        <button
                            onClick={() => setIsOverlayOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-8 text-center font-display">관리자 메뉴</h2>
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/admin/settings"
                                className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all border border-white/5 active:scale-95"
                            >
                                <div className="bg-primary/20 p-3 rounded-xl text-primary font-bold">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <p className="font-bold">비밀번호 변경</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Change Password</p>
                                </div>
                            </Link>
                            <Link
                                to="/forgot-password"
                                className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all border border-white/5 active:scale-95"
                            >
                                <div className="bg-orange-500/20 p-3 rounded-xl text-orange-500 font-bold">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="font-bold">비밀번호 찾기</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Recover Access</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="py-20 flex flex-col items-center justify-center bg-gray-50/50">
                <div className="text-[10px] font-bold text-gray-400 tracking-[0.3em] flex items-center gap-2">
                    <span>© 2026 YEHWA WORLD</span>
                    <div className="w-1.5 h-1.5 bg-primary/30 rounded-full"></div>
                    <span>ALL RIGHTS RESERVED</span>
                </div>
                <div className="mt-10 h-1 w-32 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3 rounded-full opacity-50"></div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
