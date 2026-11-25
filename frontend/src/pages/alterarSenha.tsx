import brasao from '../assets/brasao.webp';
import { useEffect, useState } from 'react';
import '../css/alterarSenha.css';

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
    const [usuario, setUsuario] = useState('');
    const [erro, setErro] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [espera, setEspera] = useState(0);

    // Contagem regressiva para liberar o reenvio
    useEffect(() => {
        if (espera <= 0) return;
        const t = setTimeout(() => setEspera((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [espera]);

    return (
        <div className="login-page display-grid">
            <aside className="login-brand display-flex position-relative">
                <svg className="login-routes position-absolute" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
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

                <div className="login-brand-top display-flex position-relative">
                    <div className="login-logo display-grid">
                        <img src={brasao} alt="Brasão da prefeitura" />
                    </div>
                    <div>
                        <strong className="display-block">Prefeitura Municipal de Santa Maria de Jetibá</strong>
                        <span>Secretaria de Transportes (SECTRAN)</span>
                    </div>
                </div>

                <div className="login-brand-copy position-relative">
                    <h1>Gestão de Frotas</h1>
                    <p>Controle de veículos, manutenções, abastecimentos e rotas da administração pública em um só lugar.</p>
                </div>
            </aside>

            <main className="login-panel display-grid">
                <section className="login-card" aria-labelledby="fp-titulo">
                    {!enviado ? (
                        <>
                            <h2 id="fp-titulo">Esqueceu sua senha?</h2>
                            <p className="login-sub">
                                Informe seu e-mail e enviaremos as instruções para criar uma nova senha.
                            </p>

                            <form>
                                <div className={`login-field${erro ? ' invalid' : ''}`}>
                                    <label htmlFor="usuario" className="display-block">E-mail</label>
                                    <div className="login-input-wrap position-relative">
                                        <span className="login-icon display-grid position-absolute">
                                            <svg {...icon} width={18} height={18}>
                                                <circle cx="12" cy="8" r="4" />
                                                <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
                                            </svg>
                                        </span>
                                        <input
                                            id="usuario"
                                            type="text"
                                            placeholder="E-mail"
                                            autoComplete="username"
                                            autoFocus
                                            value={usuario}
                                            onChange={(e) => {
                                                setUsuario(e.target.value);
                                                setErro(undefined);
                                            }}
                                            aria-invalid={!!erro}
                                            aria-describedby={erro ? 'usuario-erro' : undefined}
                                        />
                                    </div>
                                    {erro && (
                                        <p id="usuario-erro" className="login-error" role="alert">
                                            {erro}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`login-btn display-flex${loading ? ' loading' : ''}`}
                                    disabled={loading}
                                >
                                    <span className="login-spinner" aria-hidden="true" />
                                    <span>{loading ? 'Enviando...' : 'Enviar'}</span>
                                </button>
                            </form>

                            <a href="/" className="fp-back">
                                <svg {...icon} width={16} height={16}>
                                    <path d="M19 12H5M11 6l-6 6 6 6" />
                                </svg>
                                Voltar para o login
                            </a>

                            <div className="login-notice display-flex" role="note">
                                <svg {...icon} width={16} height={16}>
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 8h.01M11 12h1v5h1" />
                                </svg>
                                <span>Não recebeu acesso ou não tem e-mail cadastrado? Procure o setor de TI.</span>
                            </div>
                        </>
                    ) : (
                        <div className="fp-success" role="status">
                            <div className="fp-success-icon">
                                <svg {...icon} width={30} height={30}>
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="M3 7l9 6 9-6" />
                                </svg>
                            </div>

                            <h2 id="fp-titulo">Verifique seu e-mail</h2>
                            <p className="login-sub">
                                Se os dados informados estiverem cadastrados, você receberá em instantes as instruções para
                                redefinir sua senha. Confira também a caixa de spam.
                            </p>

                            <a href="/login" className="login-btn display-flex fp-btn-link">
                                Voltar para o login
                            </a>

                            <button
                                type="button"
                                className="fp-resend"
                                disabled={espera > 0 || loading}
                            >
                                {espera > 0 ? `Reenviar em ${espera}s` : loading ? 'Enviando...' : 'Reenviar'}
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}