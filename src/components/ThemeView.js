import React, { useState } from 'react';

import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeView({ children }) {
    const [theme, setTheme] = useState('day');

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}
