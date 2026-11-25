import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
    private readonly transporte = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: process.env.SMTP_PORT === "465",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    async enviarTrocaDeSenha(email: string, nome: string, token: string) {
        try {
            const linkRecuperacao =
            `${process.env.FRONTEND_URL}/redefinirSenha?token=${encodeURIComponent(token)}`;

            const solicitadoEm = new Intl.DateTimeFormat('pt-BR', {
                dateStyle: 'short', timeStyle: 'short', timeZone: 'America/Sao_Paulo',
            }).format(new Date()).replace(', ', ' às ');

            await this.transporte.sendMail({
                from: `"Gestão de frotas" <${process.env.SMTP_USER}>`,
                to: email,
                subject: "Redefinição de senha | Gestão de frotas",
                html: `
                    <!doctype html>
                        <html lang="pt-BR">
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <meta name="color-scheme" content="light only">
                            <title>Redefinição de senha | Gestão de frotas</title>
                            <style>
                                @media only screen and (max-width: 620px) {
                                    .px { padding-left: 22px !important; padding-right: 22px !important; }
                                    .h1 { font-size: 26px !important; line-height: 32px !important; }
                                    .btn a { display: block !important; }
                                    .step-text { font-size: 12px !important; }
                                }
                            </style>
                        </head>
                        <body style="margin:0;padding:0;background-color:#DEEAF5;-webkit-text-size-adjust:100%;">

                            <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#DEEAF5;font-size:1px;line-height:1px;">
                                Use o link para criar uma nova senha de acesso ao sistema de Gestão de Frotas.
                            </div>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#DEEAF5" style="background-color:#DEEAF5;">
                                <tr>
                                    <td align="center" style="padding:32px 16px;">

                                        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:600px;border-radius:22px;overflow:hidden;background-color:#FCFCFC;box-shadow:0 24px 48px -24px rgba(19,42,62,0.45);">

                                            <!-- Cabeçalho -->
                                            <tr>
                                                <td class="px" bgcolor="#26547C" style="background-color:#26547C;padding:36px 40px 34px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                                                    <div style="font-size:13px;line-height:20px;color:#BDD5EB;letter-spacing:0.02em;">Prefeitura Municipal de Santa Maria de Jetibá</div>
                                                    <div style="font-size:12px;line-height:18px;color:#9CC0E0;">Secretaria de Transportes (SECTRAN)</div>
                                                    <div style="font-size:28px;line-height:34px;font-weight:700;color:#FCFCFC;padding-top:20px;">Gestão de Frotas</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td bgcolor="#5996CC" height="4" style="background-color:#5996CC;height:4px;font-size:0;line-height:0;">&nbsp;</td>
                                            </tr>

                                            <!-- Conteúdo principal -->
                                            <tr>
                                                <td class="px" style="padding:40px 40px 8px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#132A3E;">
                                                    <div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#3B81BF;margin:0 0 10px 0;">
                                                        Segurança da conta
                                                    </div>
                                                    <h1 class="h1" style="margin:0 0 20px 0;font-size:30px;line-height:36px;font-weight:700;color:#1D3F5E;">
                                                        Redefina sua senha
                                                    </h1>

                                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:26px;">
                                                        Olá, <strong>${nome}</strong>.
                                                    </p>
                                                    <p style="margin:0 0 32px 0;font-size:16px;line-height:26px;color:#1D3F5E;">
                                                        Recebemos uma solicitação para redefinir a senha da sua conta no sistema de Gestão de Frotas.
                                                        Para continuar, clique no botão abaixo e escolha uma nova senha.
                                                    </p>

                                                    <!-- Botão -->
                                                    <table role="presentation" class="btn" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px 0;">
                                                        <tr>
                                                            <td align="center" bgcolor="#26547C" style="background-color:#26547C;border-radius:14px;">
                                                                <a href="${linkRecuperacao}"
                                                                style="display:block;padding:18px 36px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:17px;line-height:22px;font-weight:700;letter-spacing:0.02em;color:#FCFCFC;text-decoration:none;border-radius:14px;">
                                                                Criar nova senha &nbsp;&rarr;
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <div style="text-align:center;font-size:13px;line-height:20px;color:#316B9E;margin:0 0 36px 0;">
                                                        O link expira em <strong style="color:#26547C;">1 hora</strong> e só pode ser usado uma vez.
                                                    </div>
                                                </td>
                                            </tr>

                                            <!-- Como funciona -->
                                            <tr>
                                                <td class="px" style="padding:0 40px 36px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#DEEAF5" style="background-color:#DEEAF5;border-radius:16px;">
                                                        <tr>
                                                            <td style="padding:22px 20px 8px 20px;font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#26547C;">
                                                                Como funciona
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding:8px 12px 22px 12px;">
                                                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                                    <tr>
                                                                        <td width="33%" align="center" valign="top" style="padding:0 8px;">
                                                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                                                <tr>
                                                                                    <td width="36" height="36" align="center" bgcolor="#26547C" style="background-color:#26547C;border-radius:18px;font-size:15px;line-height:36px;font-weight:700;color:#FCFCFC;">1</td>
                                                                                </tr>
                                                                            </table>
                                                                            <div class="step-text" style="padding-top:10px;font-size:13px;line-height:19px;color:#1D3F5E;">Clique no botão<br>acima</div>
                                                                        </td>
                                                                        <td width="33%" align="center" valign="top" style="padding:0 8px;">
                                                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                                                <tr>
                                                                                    <td width="36" height="36" align="center" bgcolor="#26547C" style="background-color:#26547C;border-radius:18px;font-size:15px;line-height:36px;font-weight:700;color:#FCFCFC;">2</td>
                                                                                </tr>
                                                                            </table>
                                                                            <div class="step-text" style="padding-top:10px;font-size:13px;line-height:19px;color:#1D3F5E;">Defina sua<br>nova senha</div>
                                                                        </td>
                                                                        <td width="33%" align="center" valign="top" style="padding:0 8px;">
                                                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                                                <tr>
                                                                                    <td width="36" height="36" align="center" bgcolor="#26547C" style="background-color:#26547C;border-radius:18px;font-size:15px;line-height:36px;font-weight:700;color:#FCFCFC;">3</td>
                                                                                </tr>
                                                                            </table>
                                                                            <div class="step-text" style="padding-top:10px;font-size:13px;line-height:19px;color:#1D3F5E;">Entre no<br>sistema</div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Detalhes da solicitação -->
                                            <tr>
                                                <td class="px" style="padding:0 40px 32px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                                                    <div style="font-size:12px;line-height:16px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#26547C;margin:0 0 12px 0;">
                                                        Detalhes da solicitação
                                                    </div>
                                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #BDD5EB;border-radius:14px;border-collapse:separate;">
                                                        <tr>
                                                            <td style="padding:14px 18px;font-size:13px;line-height:20px;color:#316B9E;border-bottom:1px solid #DEEAF5;" width="38%">Conta</td>
                                                            <td style="padding:14px 18px;font-size:14px;line-height:20px;font-weight:600;color:#132A3E;border-bottom:1px solid #DEEAF5;">${email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td style="padding:14px 18px;font-size:13px;line-height:20px;color:#316B9E;" width="38%">Solicitado em</td>
                                                            <td style="padding:14px 18px;font-size:14px;line-height:20px;font-weight:600;color:#132A3E;">${solicitadoEm}</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Link alternativo -->
                                            <tr>
                                                <td class="px" style="padding:0 40px 32px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                                                    <p style="margin:0 0 6px 0;font-size:13px;line-height:20px;color:#316B9E;">
                                                        O botão não funcionou? Copie e cole este endereço no navegador:
                                                    </p>
                                                    <p style="margin:0;font-size:13px;line-height:20px;word-break:break-all;">
                                                        <a href="${linkRecuperacao}" style="color:#3B81BF;text-decoration:underline;">${linkRecuperacao}</a>
                                                    </p>
                                                </td>
                                            </tr>

                                            <!-- Aviso de segurança -->
                                            <tr>
                                                <td class="px" style="padding:0 40px 40px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                                                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                                        <tr>
                                                            <td width="5" bgcolor="#3B81BF" style="background-color:#3B81BF;border-radius:5px;font-size:0;line-height:0;">&nbsp;</td>
                                                            <td style="padding:4px 0 4px 18px;font-size:14px;line-height:22px;color:#1D3F5E;">
                                                                <strong style="color:#132A3E;">Não foi você?</strong><br>
                                                                Ignore este e-mail. Sua senha continua a mesma e nenhuma alteração será feita.
                                                                Por segurança, <strong>nunca compartilhe este link</strong> com ninguém.
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>

                                            <!-- Rodapé -->
                                            <tr>
                                                <td class="px" align="center" bgcolor="#132A3E" style="background-color:#132A3E;padding:28px 40px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                                                    <div style="font-size:13px;line-height:20px;font-weight:600;color:#FCFCFC;">Gestão de Frotas</div>
                                                    <div style="font-size:12px;line-height:19px;color:#9CC0E0;padding-top:6px;">
                                                        Mensagem automática, por favor não responda.<br>
                                                        Em caso de dúvidas, procure o setor de TI.
                                                    </div>
                                                    <div style="font-size:11px;line-height:17px;color:#7AABD6;padding-top:14px;">
                                                        &copy; 2026 Prefeitura Municipal de Santa Maria de Jetibá
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>
                            </table>
                        </body>
                    </html>
                `,
                text: [
                    `Olá, ${nome}.`,
                    ``,
                    `Recebemos uma solicitação para redefinir a senha da sua conta no sistema de Gestão de Frotas.`,
                    ``,
                    `Para criar uma nova senha, acesse o link abaixo (válido por 1 hora e de uso único):`,
                    linkRecuperacao,
                    ``,
                    `Conta: ${email}`,
                    `Solicitado em: ${solicitadoEm}`,
                    ``,
                    `Se não foi você, ignore este e-mail. Sua senha continua a mesma e nenhuma alteração será feita.`,
                    `Por segurança, nunca compartilhe este link com ninguém.`,
                    ``,
                    `Prefeitura Municipal de Santa Maria de Jetibá`,
                    `Secretaria de Transportes (SECTRAN)`,
                    `Mensagem automática, por favor não responda. Em caso de dúvidas, procure o setor de TI.`,
                ].join("\n"),
            });
        } catch (error) {
            console.error("Erro ao enviar e-mail", error);
        };
    }
}
