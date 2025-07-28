// src/views/ProfileView.tsx
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { PersonaService } from 'Frontend/generated/endpoints';
import { TextField, Button, VerticalLayout, Notification, HorizontalLayout, NumberField } from '@vaadin/react-components';
import { useAuth } from 'Frontend/security/auth';

export const config: ViewConfig = {
    menu: {
        icon: 'vaadin:user',
        title: 'Mi Perfil',
        order: 1
    }
};

interface UserData {
    id?: number;
    usuario: string;
    correo: string;
    telefono: string;
    edad: string;
    rol: string;
}

export  function ProfileView() {
    const { state } = useAuth();
    const [userData, setUserData] = useState<UserData>({
        usuario: '',
        correo: state.user || '',
        telefono: '',
        edad: '',
        rol: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            if (!state.user) return;

            try {
                setLoading(true);

                // 1. Obtener el ID del usuario por su correo
                const userId = await PersonaService.getUserIdByEmail(state.user);
                if (!userId) {
                    throw new Error('No se encontró el ID del usuario');
                }

                // 2. Obtener los datos completos del usuario
                const personaData = await PersonaService.getPersonaById(userId);
                if (!personaData) {
                    throw new Error('No se encontraron datos para el usuario');
                }

                setUserData({
                    id: userId,
                    usuario: personaData.usuario || '',
                    correo: personaData.correo || state.user,
                    telefono: personaData.telefono || '',
                    edad: personaData.edad || '',
                    rol: personaData.id_rol === "1" ? 'Administrador' : 'Usuario'
                });

            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);
                Notification.show('Error al cargar los datos del perfil', {
                    theme: 'error',
                    position: 'top-center'
                });
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, [state.user]);

    const handleSave = async () => {
        if (!userData.id || !userData.usuario || !userData.telefono || !userData.edad) {
            Notification.show('Por favor complete todos los campos requeridos', {
                theme: 'error',
                position: 'top-center'
            });
            return;
        }

        try {
            const edadNumber = parseInt(userData.edad);
            if (isNaN(edadNumber)) {
                throw new Error('La edad debe ser un número válido');
            }

            await PersonaService.updateP(
                userData.id,
                userData.usuario,
                userData.telefono,
                edadNumber
            );

            Notification.show('Perfil actualizado correctamente', {
                theme: 'success',
                position: 'top-center'
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error al actualizar:', error);
            Notification.show(error instanceof Error ? error.message : 'Error al actualizar el perfil', {
                theme: 'error',
                position: 'top-center'
            });
        }
    };

    if (loading) {
        return (
            <VerticalLayout style={{ alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div>Cargando información del perfil...</div>
            </VerticalLayout>
        );
    }

    return (
        <div className="p-m max-w-screen-md mx-auto">
            <h1 className="text-2xl font-bold mb-m">Mi Perfil Personal</h1>

            <VerticalLayout theme="spacing" className="w-full">
                <TextField
                    label="Nombre completo"
                    value={userData.usuario}
                    onValueChanged={(e) => setUserData({...userData, usuario: e.detail.value})}
                    readonly={!isEditing}
                    className="w-full"
                    required
                />

                <TextField
                    label="Correo electrónico"
                    value={userData.correo}
                    readonly
                    className="w-full"
                />

                <TextField
                    label="Teléfono"
                    value={userData.telefono}
                    onValueChanged={(e) => setUserData({...userData, telefono: e.detail.value})}
                    readonly={!isEditing}
                    className="w-full"
                    required
                />

                <NumberField
                    label="Edad"
                    value={userData.edad}
                    onValueChanged={(e) => setUserData({...userData, edad: e.detail.value})}
                    readonly={!isEditing}
                    className="w-full"
                    required
                    min={1}
                    max={120}
                />

                <TextField
                    label="Rol"
                    value={userData.rol}
                    readonly
                    className="w-full"
                />

                <HorizontalLayout theme="spacing" className="mt-l">
                    {isEditing ? (
                        <>
                            <Button theme="primary" onClick={handleSave}>
                                Guardar cambios
                            </Button>
                            <Button theme="tertiary" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <Button theme="primary" onClick={() => setIsEditing(true)}>
                            Editar perfil
                        </Button>
                    )}
                </HorizontalLayout>
            </VerticalLayout>
        </div>
    );
}