import { useEffect } from 'react';
import './css/modalFeedback.css';

const icon = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    viewBox: '0 0 24 24',
    'aria-hidden': true,
};

type ModalFeedbackProps = {
    aberto: boolean;
    tipo: "erro" | "sucesso";
    mensagem: string;
    aoFechar: () => void;
};

export default function ModalFeedback({
    aberto,
    tipo,
    mensagem,
    aoFechar
}: ModalFeedbackProps) {

    // Fecha com a tecla Esc
    useEffect(() => {
        if (!aberto) return;

        function aoTeclar(evento: KeyboardEvent) {
            if (evento.key === 'Escape') aoFechar();
        }

        document.addEventListener('keydown', aoTeclar);
        return () => document.removeEventListener('keydown', aoTeclar);
    }, [aberto, aoFechar]);

    if (!aberto) {
        return null;
    }

    const titulo = tipo === "erro"
        ? "Algo deu errado"
        : "Tudo certo";

    return (
        <div className="modal-fundo" onClick={aoFechar}>
            <div
                className={`modal-feedback modal-${tipo}`}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                aria-describedby="modal-mensagem"
                onClick={(evento) => evento.stopPropagation()}
            >
                <div className="modal-icone">
                    {tipo === "erro" ? (
                        <svg {...icon} width={30} height={30}>
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 8v5M12 16h.01" />
                        </svg>
                    ) : (
                        <svg {...icon} width={30} height={30}>
                            <circle cx="12" cy="12" r="9" />
                            <path d="M8 12.5l2.7 2.7L16 9.5" />
                        </svg>
                    )}
                </div>

                <h2 id="modal-titulo">{titulo}</h2>

                <p id="modal-mensagem">{mensagem}</p>

                <button type="button" onClick={aoFechar} autoFocus>
                    {tipo === "erro" ? "Tentar novamente" : "Continuar"}
                </button>
            </div>
        </div>
    );
};