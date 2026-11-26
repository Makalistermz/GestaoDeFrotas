import brasao from "../assets/brasao.webp"
import { useState } from 'react';

const icon = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
};

export default function AlterarSenha() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)

    return (
        <div className="auth-page display-grid">
            <aside className="auth-brand display-flex position-relative">
                <svg className="auth-routes position-absolute" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <path id="rota-principal" className="route-line" d="M-20 620 C 120 560, 160 420, 300 440 S 480 300, 640 240" />
                    <path className="route-line" d="M-20 300 C 100 340, 200 220, 320 260 S 520 520, 640 480" />
                    <g>
                        <circle className="pin" cx="300" cy="440" r="5" />
                        <circle className="pulse" cx="300" cy="440" r="8" />
                        <circle className="pin" cx="320" cy="260" r="5" />
                        <circle className="pulse d2" cx="320" cy="260" r="8" />
                        <circle className="pin" cx="505" cy="330" r="5" />
                        <circle className="pulse d3" cx="505" cy="330" r="8" />
                    </g>
                    <circle className="vehicle" r="6">
                        <animateMotion dur="14s" repeatCount="indefinite">
                        <mpath href="#rota-principal" />
                        </animateMotion>
                    </circle>
                </svg>

                <div className="auth-brand-top display-flex position-relative">
                    <div className="auth-logo display-grid">
                        <img src={brasao} alt="Brasão da prefeitura" />
                    </div>
                    <div>
                        <strong className="display-block">Prefeitura Municipal de Santa Maria de Jetibá</strong>
                        <span>Secretaria de Transportes (SECTRAN)</span>
                    </div>
                </div>

                <div className="auth-brand-copy position-relative">
                    <h1>Gestão de Frotas</h1>
                    <p>Controle de veículos, manutenções, abastecimentos e rotas da administração pública em um só lugar.</p>
                </div>
            </aside>

            <main className="auth-panel display-grid">
                <section className="auth-card" aria-labelledby="auth-titulo">
                    <h2 id="auth-titulo">Troca de senha</h2>
                    <p className="auth-sub">Defina uma nova senha para acessar o sistema</p>

                    <form>
                        <div className={`auth-field`}>
                            <label htmlFor="usuario">Senha</label>
                            <div className="auth-input-wrap position-relative">
                                <span className="auth-icon display-grid position-absolute">
                                    <svg {...icon} width={18} height={18}>
                                        <rect x="4" y="11" width="16" height="10" rx="2" />
                                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                                    </svg>
                                </span>
                                <input
                                    id="senha"
                                    type={mostrarSenha ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-toggle display-grid position-absolute"
                                    onClick={() => setMostrarSenha((v) => !v)}
                                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    <svg {...icon} width={20} height={20}>
                                        {mostrarSenha ? (
                                        <>
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 6.1A10.5 10.5 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.4 7.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 4-.8" />
                                            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                        </>
                                        ) : (
                                        <>
                                            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className={`auth-field`}>
                            <label htmlFor="senha" className="display-block">Confirmar senha</label>
                            <div className="auth-input-wrap position-relative">
                                <span className="auth-icon display-grid position-absolute">
                                    <svg {...icon} width={18} height={18}>
                                        <rect x="4" y="11" width="16" height="10" rx="2" />
                                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                                    </svg>
                                </span>
                                <input
                                    id="confirmSenha"
                                    type={mostrarConfirmarSenha ? 'text' : 'password'}
                                    placeholder="Confirme sua senha"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="auth-toggle display-grid position-absolute"
                                    onClick={() => setMostrarConfirmarSenha((v) => !v)}
                                    aria-label={mostrarConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                                >
                                    <svg {...icon} width={20} height={20}>
                                        {mostrarConfirmarSenha ? (
                                        <>
                                            <path d="M3 3l18 18" />
                                            <path d="M10.6 6.1A10.5 10.5 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9M6.4 7.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 4-.8" />
                                            <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
                                        </>
                                        ) : (
                                        <>
                                            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button type="submit" className={`auth-btn display-flex`}>
                            <span className="auth-spinner display-block" aria-hidden="true" />
                            <span>Alterar</span>
                        </button>
                    </form>

                </section>
            </main>
        </div>
    );
}