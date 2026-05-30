const autorizar = (...rolesPermitidos) => {
    return (req, res, next) => {
        // O role deve ser definido pelo middleware de autenticação (verificarToken.js)
        if (!req.userRole) {
            return res.status(403).json({ ok: false, message: "Acesso negado: cargo do usuário não identificado" });
        }

        // Se o cargo do usuário estiver na lista de cargos permitidos, prossegue
        if (rolesPermitidos.includes(req.userRole)) {
            return next();
        }

        // Caso contrário, bloqueia o acesso
        return res.status(403).json({ 
            ok: false, 
            message: `Acesso negado: esta ação requer um dos seguintes perfis: [${rolesPermitidos.join(', ')}]. Seu perfil atual é: '${req.userRole}'.` 
        });
    };
};

export default autorizar;
