import { ReactNode } from 'react';
import { useAuth } from 'Frontend/security/auth';

interface AuthWrapperProps {
    roles?: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export function AuthWrapper({
                                roles,
                                children,
                                fallback = null,
                            }: AuthWrapperProps) {
    const { state, hasAccess } = useAuth();

    // Verificación más robusta
    const checkAccess = () => {
        if (!state.user) return false;
        if (!roles || roles.length === 0) return true;

        // Obtener roles del usuario (adaptado a tu estructura)
        const userRoles = state.user.authorities?.map((auth: any) =>
            auth.authority.replace('ROLE_', '').toLowerCase()
        ) || [];

        return roles.some(role => userRoles.includes(role.toLowerCase()));
    };

    return <>{checkAccess() ? children : fallback}</>;
}

// Versión específica para admin
export function AdminOnly({ children, fallback = null }: Omit<AuthWrapperProps, 'roles'>) {
    return (
        <AuthWrapper roles={['admin']} fallback={fallback}>
            {children}
        </AuthWrapper>
    );
}