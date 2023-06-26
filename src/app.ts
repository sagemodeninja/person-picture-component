import '/public/css/style.css';

import './';
import { DesignToken } from '@sagemodeninja/design-token-provider';
import colorSchemeProvider from '@sagemodeninja/color-scheme-provider';

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle_mode');
    const applyDesignTokens = () => {
        const fillTextPrimary = new DesignToken<string>('fill-text-primary');
        const fillControlAltQuarternary = new DesignToken<string>('fill-control-alt-quarternary');
        const backgroundFillMicaBase = new DesignToken<string>('background-fill-mica-base');

        const isLight = colorSchemeProvider.colorScheme === 'light';

        document.body.style.colorScheme = isLight ? 'light' : 'dark';

        fillTextPrimary.setDefault(isLight ? 'rgb(0 0 0 / 89.56%)' : '#ffffff');
        fillControlAltQuarternary.setDefault(
            isLight ? 'rgba(0, 0, 0, 0.0924)' : 'rgba(255, 255, 255, 0.0698)'
        );
        backgroundFillMicaBase.setDefault(isLight ? '#f3f3f3' : '#202020');
    };

    applyDesignTokens();
    toggleBtn.addEventListener('click', () => colorSchemeProvider.toggle());
    colorSchemeProvider.subscribeNotification(applyDesignTokens);
});
