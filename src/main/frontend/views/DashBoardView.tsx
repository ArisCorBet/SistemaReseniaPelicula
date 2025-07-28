// frontend/views/dashboard/DashboardView.tsx
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';
import { useAuth } from 'Frontend/security/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';

export const config: ViewConfig = {
    menu: {
        icon: 'vaadin:dashboard',
        title: 'Dashboard',
        order: 0 // Primera posición en el menú
    }
};

export function DashboardView() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (!state.user) {
            navigate('/login');
        } else {
            setUserName(state.user.name || state.user.username || 'Usuario');
        }
    }, [state.user, navigate]);

    return (
        <VerticalLayout style={{
            padding: '2em',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            minHeight: '100vh'
        }}>
            {/* Encabezado con logo y título */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
                width: '100%'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: 300,
                    color: '#2c3e50',
                    marginBottom: '0.5rem',
                    fontFamily: '"Montserrat", sans-serif',
                    background: 'linear-gradient(to right, #3498db, #9b59b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    CineCritic UNL
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#7f8c8d',
                    maxWidth: '800px',
                    margin: '0 auto',
                    lineHeight: '1.6'
                }}>
                    Sistema Gestor de Reseñas Cinematográficas
                </p>
            </div>

            {/* Mensaje de bienvenida personalizado */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                width: '80%',
                maxWidth: '1000px',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    color: '#2c3e50',
                    marginBottom: '1rem',
                    fontFamily: '"Montserrat", sans-serif'
                }}>
                    ¡Bienvenido, <span style={{ color: '#3498db' }}>{userName}</span>!
                </h2>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#34495e',
                    lineHeight: '1.7'
                }}>
                    Explora, descubre y comparte tus opiniones sobre las últimas películas con nuestra comunidad cinéfila.
                </p>
            </div>

            {/* Tarjetas de características */}
            <HorizontalLayout theme="spacing" style={{
                width: '90%',
                maxWidth: '1200px',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {/* Tarjeta 1 */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    width: '300px',
                    margin: '1rem',
                    transition: 'transform 0.3s ease',
                    ':hover': {
                        transform: 'translateY(-5px)'
                    }
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <span style={{
                            backgroundColor: '#3498db',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            color: 'white',
                            fontSize: '1.2rem'
                        }}>
                            🎬
                        </span>
                        <h3 style={{
                            fontSize: '1.3rem',
                            color: '#2c3e50',
                            margin: 0
                        }}>
                            Reseñas Detalladas
                        </h3>
                    </div>
                    <p style={{
                        color: '#7f8c8d',
                        lineHeight: '1.6'
                    }}>
                        Crea y comparte reseñas completas con calificaciones por categorías y análisis profundos.
                    </p>
                </div>

                {/* Tarjeta 2 */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    width: '300px',
                    margin: '1rem',
                    transition: 'transform 0.3s ease',
                    ':hover': {
                        transform: 'translateY(-5px)'
                    }
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <span style={{
                            backgroundColor: '#9b59b6',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            color: 'white',
                            fontSize: '1.2rem'
                        }}>
                            🏆
                        </span>
                        <h3 style={{
                            fontSize: '1.3rem',
                            color: '#2c3e50',
                            margin: 0
                        }}>
                            Recomendaciones
                        </h3>
                    </div>
                    <p style={{
                        color: '#7f8c8d',
                        lineHeight: '1.6'
                    }}>
                        Descubre películas basadas en tus gustos y las valoraciones de nuestra comunidad.
                    </p>
                </div>

                {/* Tarjeta 3 */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    width: '300px',
                    margin: '1rem',
                    transition: 'transform 0.3s ease',
                    ':hover': {
                        transform: 'translateY(-5px)'
                    }
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <span style={{
                            backgroundColor: '#2ecc71',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '1rem',
                            color: 'white',
                            fontSize: '1.2rem'
                        }}>
                            👥
                        </span>
                        <h3 style={{
                            fontSize: '1.3rem',
                            color: '#2c3e50',
                            margin: 0
                        }}>
                            Comunidad
                        </h3>
                    </div>
                    <p style={{
                        color: '#7f8c8d',
                        lineHeight: '1.6'
                    }}>
                        Conéctate con otros cinéfilos, discute películas y encuentra críticos con gustos similares.
                    </p>
                </div>
            </HorizontalLayout>

            {/* Sección de créditos */}
            <div style={{
                marginTop: '3rem',
                textAlign: 'center',
                padding: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: '12px',
                width: '80%',
                maxWidth: '800px'
            }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    color: '#7f8c8d',
                    marginBottom: '1rem',
                    fontWeight: 'normal'
                }}>
                    Desarrollado con ❤️ por
                </h3>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <span style={{
                        backgroundColor: '#3498db',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                    }}>
                        Isauro Rivera
                    </span>
                    <span style={{
                        backgroundColor: '#9b59b6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                    }}>
                        Jossibel Pérez
                    </span>
                    <span style={{
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                    }}>
                        Ariana Córdova
                    </span>
                </div>
                <p style={{
                    marginTop: '1.5rem',
                    color: '#95a5a6',
                    fontSize: '0.9rem'
                }}>
                    Proyecto desarrollado por estudiantes de la Universidad Nacional de Loja
                </p>
                <div style={{
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src="/images/unl-logo.png"
                        alt="Logo UNL"
                        style={{
                            height: '40px',
                            marginRight: '1rem'
                        }}
                    />
                    <span style={{
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }}>
                        Universidad Nacional de Loja
                    </span>
                </div>
            </div>
        </VerticalLayout>
    );
}