import brasao from "../assets/brasao.webp"
function Login() {
    return(
        
    return (
        <div className="login-page">
            <aside className="login-brand">
                <svg className="login-routes" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <path id="rota-principal" className="route-line" d="M-20 620 C 120 560, 160 420, 300 440 S 480 300, 640 240" />
                    <path className="route-line" d="M-20 300 C 100 340, 200 220, 320 260 S 520 520, 640 480" />
                    <g>
                        <circle className="pin" cx="300" cy="440" r="5" />
                        <circle className="pulse" cx="300" cy="440" r="8" />
                        <circle className="pin" cx="320" cy="260" r="5" />
                        <circle className="pulse d2" cx="320" cy="260" r="8" />
                        <circle className="pin" cx="480" cy="330" r="5" />
                        <circle className="pulse d3" cx="480" cy="330" r="8" />
                    </g>
                    <circle className="vehicle" r="6">
                        <animateMotion dur="14s" repeatCount="indefinite">
                        <mpath href="#rota-principal" />
                        </animateMotion>
                    </circle>
                </svg>

                <div className="login-brand-top">
                    <div className="login-logo">
                        <img src={brasao} alt="Brasão da prefeitura" />
                    </div>
                    <div>
                        <strong>Prefeitura Municipal de Santa Maria de Jetibá</strong>
                        <span>Secretaria de Transportes (SECTRAN)</span>
                    </div>
                </div>

                <div className="login-brand-copy">
                    <h1>Gestão de Frotas</h1>
                    <p>Controle de veículos, manutenções, abastecimentos e rotas da administração pública em um só lugar.</p>
                </div>
            </aside>
        </div>
    );
}

export default Login;