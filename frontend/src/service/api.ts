export async function apiFetch(caminho: string, opcoes: RequestInit = {}) {
    const token = localStorage.getItem("access_token");

    const resposta = await fetch(`${import.meta.env.VITE_API_URL}${caminho}`, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...opcoes.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (resposta.status === 401) {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
    }

    return resposta;
}