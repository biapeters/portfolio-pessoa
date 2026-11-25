import { useEffect, useState } from 'react';

// Tema claro/escuro: começa pelo que o index.html já aplicou e salva a escolha
export function useTheme() {
    const [theme, setTheme] = useState(() =>
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // navegação privada: o tema só não fica salvo
        }
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    return [theme, toggleTheme];
}
