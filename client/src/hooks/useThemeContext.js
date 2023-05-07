import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('darkModeContext must be used within an toggleModeProvider');
    }
    return context;
};