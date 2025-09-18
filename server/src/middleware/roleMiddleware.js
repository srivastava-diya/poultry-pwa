export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const hasAccess = allowedRoles.includes(req.user.role);
        if (!hasAccess) {
            return res.status(403).json({ message: 'Forbidden: Access Denied' });
        }

        next();
    };
};
