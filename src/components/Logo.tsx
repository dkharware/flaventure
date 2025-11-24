export const Logo = () => (
    <svg width="150" height="32" viewBox="0 0 160 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FDEBC9"/>
                <stop offset="40%" stopColor="#F9D7D7"/>
                <stop offset="100%" stopColor="#F6C4E1"/>
            </linearGradient>
        </defs>
        <style>
            {`
                @font-face {
                    font-family: 'Bauhaus 93';
                    src: local('Bauhaus 93');
                }
            `}
        </style>
        <text style={{fontFamily: "'Bauhaus 93', sans-serif"}} fontSize="28" fontWeight="normal">
            <tspan x="0" y="24" fill="url(#logo-gradient)" stroke="black" strokeWidth="0.5">easy</tspan>
            <tspan x="90" y="24" fill="url(#logo-gradient)" stroke="black" strokeWidth="0.5">v</tspan>
        </text>
         <path d="M85 0 L 105 0 L 85 28 L 65 28 Z" fill="url(#logo-gradient)" stroke="black" strokeWidth="0.5" />
        <text style={{fontFamily: "'Bauhaus 93', sans-serif"}} fontSize="16" fontWeight="normal">
            <tspan x="45" y="36" fill="url(#logo-gradient)" stroke="black" strokeWidth="0.5">freecv</tspan>
        </text>
    </svg>
  );
