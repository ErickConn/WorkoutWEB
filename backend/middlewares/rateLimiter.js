import { rateLimit } from 'express-rate-limit';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Limite de 10 tentativas de login por IP por janela de 15 minutos
    message: { 
        ok: false, 
        message: "Muitas tentativas de login. Tente novamente após 15 minutos." 
    },
    standardHeaders: true, // Retorna informações de limite nos headers RateLimit-*
    legacyHeaders: false, // Desativa os headers legados X-RateLimit-*
});
