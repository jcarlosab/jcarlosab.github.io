import '@/app/ui/global.css';
import { departureMono } from '@/app/ui/fonts';

export const metadata = {
    title: 'RetroKodes - Trucos para juegos Retro',
    description: 'Busca trucos y códigos para tus juegos retro favoritos de NES, SNES, Genesis y más.',
    icons: {
        icon: '/rk_icon.ico',
        shortcut: '/rk_icon.ico',
        apple: '/rk_icon.ico',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={`${departureMono.variable} antialiased`}>
            <body>{children}</body>
        </html>
    );
}
