'use client';

import { useState, useEffect, useRef } from "react";

import Card from "./Card";
import HighlightText from "./HighlightText";
import ScrollToTop from "./ScrollToTop";


export default function GameBrowser({ platforms }) {
    const [data, setData] = useState({});
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [theme, setTheme] = useState("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("theme");
        if (saved) setTheme(saved);
        else setTheme("dark");
    }, []);

    const [konamiMode, setKonamiMode] = useState(false);
    const [konamiLives, setKonamiLives] = useState(30);
    const [konamiKeys, setKonamiKeys] = useState([]);

    const [limit, setLimit] = useState(20);
    const observerTarget = useRef(null);

    useEffect(() => {
        setLimit(20);
    }, [search, selectedPlatforms]);

    useEffect(() => {
        if (konamiMode && konamiLives > 0) {
            const timer = setTimeout(() => {
                setKonamiLives((prev) => {
                    if (prev <= 1) {
                        setKonamiMode(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [konamiMode, konamiLives]);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            const promises = platforms.map(p =>
                fetch(`/game_codes/${p.file}`).then(r => r.json())
            );
            const results = await Promise.all(promises);
            const newData = {};
            platforms.forEach((p, i) => { newData[p.name] = results[i]; });
            setData(newData);
            setLoading(false);
        };
        loadAll();
    }, [platforms]);

    useEffect(() => {
        const konamiCode = [
            "ArrowUp",
            "ArrowUp",
            "ArrowDown",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "ArrowLeft",
            "ArrowRight",
            "b",
            "a",
        ];

        const handleKeyDown = (e) => {
            setKonamiKeys((prev) => {
                const newKeys = [...prev, e.key];
                if (newKeys.length > konamiCode.length) {
                    newKeys.shift();
                }

                if (JSON.stringify(newKeys) === JSON.stringify(konamiCode)) {
                    activeKonamiMode();
                    return [];
                }

                return newKeys;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const normalized = search.replace(/[\s,]/g, "").toUpperCase();
        const konamiString = "↑, ↑, ↓, ↓, ←, →, ←, →, B, A".replace(/[\s,]/g, "");
        if (normalized === konamiString) {
            activeKonamiMode();
        }
    }, [search]);

    const activeKonamiMode = () => {
        setKonamiMode(true);
        setKonamiLives(30);
        document.body.classList.add("konami-activated");
        setTimeout(() => {
            document.body.classList.remove("konami-activated");
        }, 2000);
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const filteredGames =
        selectedPlatforms.length === 0
            ? Object.entries(data)
                .flatMap(([p, games]) =>
                    Object.entries(games).map(([game, codes]) => [game, codes, p])
                )
                .map(([game, codes, p]) => {
                    if (!search) return [game, codes, p];

                    const gameMatches = game.toLowerCase().includes(search.toLowerCase());

                    const processedCodes = codes
                        .map((code) => {
                            if (code.category) {
                                const matchingList = code.list.filter(
                                    (item) =>
                                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                                        item.description
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        (item.code &&
                                            item.code.toLowerCase().includes(search.toLowerCase()))
                                );

                                const categoryMatches = code.category
                                    .toLowerCase()
                                    .includes(search.toLowerCase());

                                if (categoryMatches) return code;
                                if (matchingList.length > 0)
                                    return { ...code, list: matchingList };
                                return null;
                            }

                            const matches =
                                code.name.toLowerCase().includes(search.toLowerCase()) ||
                                code.description
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                (code.code &&
                                    code.code.toLowerCase().includes(search.toLowerCase()));
                            return matches ? code : null;
                        })
                        .filter(Boolean);

                    if (gameMatches) return [game, codes, p];
                    if (processedCodes.length > 0) return [game, processedCodes, p];
                    return null;
                })
                .filter(Boolean)
                .sort((a, b) => a[0].localeCompare(b[0]))
            : selectedPlatforms
                .flatMap((p) =>
                    Object.entries(data[p] || {}).map(([game, codes]) => [game, codes, p])
                )
                .map(([game, codes, p]) => {
                    if (!search) return [game, codes, p];

                    const gameMatches = game.toLowerCase().includes(search.toLowerCase());

                    const processedCodes = codes
                        .map((code) => {
                            if (code.category) {
                                const matchingList = code.list.filter(
                                    (item) =>
                                        item.name.toLowerCase().includes(search.toLowerCase()) ||
                                        item.description
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ||
                                        (item.code &&
                                            item.code.toLowerCase().includes(search.toLowerCase()))
                                );

                                const categoryMatches = code.category
                                    .toLowerCase()
                                    .includes(search.toLowerCase());

                                if (categoryMatches) return code;
                                if (matchingList.length > 0)
                                    return { ...code, list: matchingList };
                                return null;
                            }

                            const matches =
                                code.name.toLowerCase().includes(search.toLowerCase()) ||
                                code.description
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                (code.code &&
                                    code.code.toLowerCase().includes(search.toLowerCase()));
                            return matches ? code : null;
                        })
                        .filter(Boolean);

                    if (gameMatches) return [game, codes, p];
                    if (processedCodes.length > 0) return [game, processedCodes, p];
                    return null;
                })
                .filter(Boolean)
                .sort((a, b) => a[0].localeCompare(b[0]));

    const visibleGames = filteredGames.slice(0, limit);

    useEffect(() => {
        const currentTarget = observerTarget.current;
        if (!currentTarget) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLimit((prev) => prev + 20);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(currentTarget);

        return () => {
            observer.disconnect();
        };
    }, [visibleGames.length, filteredGames.length]);

    return (
        <div className="app">
            <header className="app-header">
                <h1 className={`logo ${konamiMode ? "konami-mode" : ""}`}>
                    RetroKodes
                    {konamiMode && (
                        <span className="konami-lives">x{konamiLives}</span>
                    )}
                </h1>
                {mounted && (
                    <button onClick={toggleTheme} className="theme-toggle">
                        {theme === "light" ? "◐" : "◑"}
                    </button>
                )}
                {!mounted && <div className="theme-toggle" style={{ visibility: 'hidden' }}>◐</div>}
            </header>

            <div className="filters">
                <div className="search-container">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Buscar juego..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="tags">
                    <span
                        className={`tag tag-all ${selectedPlatforms.length === 0 ? "active" : ""}`}
                        onClick={() => setSelectedPlatforms([])}
                    >
                        Todos
                    </span>
                    {platforms.map((p) => (
                        <span
                            key={p.name}
                            className={`tag tag-${p.name.toLowerCase().replace(/\s+/g, "-")} ${selectedPlatforms.includes(p.name) ? "active" : ""}`}
                            onClick={() => {
                                setSelectedPlatforms((prev) =>
                                    prev.includes(p.name)
                                        ? prev.filter((x) => x !== p.name)
                                        : [...prev, p.name]
                                );
                            }}
                        >
                            {p.name}
                        </span>
                    ))}
                </div>
            </div>

            <main className="content">
                {loading ? (
                    <div ref={observerTarget} className="loading-more">
                        <div className="spinner"></div>
                    </div>
                ) : visibleGames.length > 0 ? (
                    <>
                        {visibleGames.map(([game, codes, p]) => (
                            <div key={`${game}-${p}`} className="game-block">
                                <div className="game-header">
                                    <h2 className="game-title">
                                        <HighlightText text={game} highlight={search} />
                                    </h2>
                                    <div className={`badge badge-${p.toLowerCase().replace(/\s+/g, "-")}`}>{p}</div>
                                </div>
                                <div className="list-cards">
                                    {codes.map((code, idx) => (
                                        <Card key={idx} code={code} search={search} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="no-results">No se encontraron resultados</div>
                )}
            </main>
            {visibleGames.length < filteredGames.length && (
                <div
                    ref={observerTarget}
                    className="loading-more"
                >
                    <div className="spinner"></div>
                </div>
            )}
            <ScrollToTop />
        </div>
    );
}
