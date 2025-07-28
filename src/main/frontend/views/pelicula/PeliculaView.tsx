import React, { useEffect, useState } from 'react';
import { AdminOnly } from 'Frontend/components/AuthWrapper';
import {
    VerticalLayout,
    HorizontalLayout,
    Grid,
    GridColumn,
    Button,
    Notification,
    Icon
} from '@vaadin/react-components';
import { PeliculaService } from 'Frontend/generated/endpoints';
import {CrearPelicula} from './crearPelicula';
import handleError from "Frontend/views/_ErrorHandler";
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";
import {useAuth} from "Frontend/security/auth";

export const config: ViewConfig = {
    title: 'Gestion Peliculas',
    menu: {
        icon: 'vaadin:film',
        order: 1,
        title: 'Gestion Peliculas',
    },
};
interface Pelicula {
    id: number;
    titulo: string;
    sinopsis: string;
    duracion: string;
    fechaEstreno: string;
    imagen: string;
    trailer: string;
    generos: string[];
    actores: string[];
    directores: string[];
}
export function AccessDeniedMessage() {
    return (
        <div style={{
            padding: '1rem',
            backgroundColor: 'var(--lumo-error-color-10pct)',
            borderRadius: 'var(--lumo-border-radius)',
            color: 'var(--lumo-error-text-color)'
        }}>
            <Icon icon="vaadin:lock" style={{ marginRight: '0.5rem' }} />
            No tienes permisos para realizar esta acción
        </div>
    );
}

type GeneroOption = { value: string; label: string };
type ActorOption = { value: string; label: string };
type DirectorOption = { value: string; label: string };

export default function ListaPelicula() {
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [listaGenero, setListaGenero] = useState<GeneroOption[]>([]);
    const [listaActor, setListaActor] = useState<ActorOption[]>([]);
    const [listaDirector, setListaDirector] = useState<DirectorOption[]>([]);
    const { state } = useAuth();

    useEffect(() => {
        console.log("Datos de autenticación:", state.user);
    }, [state.user]);

    const handleImageHover = (e: React.MouseEvent<HTMLImageElement>, isHover: boolean) => {
        const img = e.currentTarget;
        img.style.transform = isHover ? 'scale(1.05)' : 'scale(1)';
    };

    /////////////MANEJO DE COMBOS ACTOR,DIRECTOR GENERO ///////////////////////
    useEffect(() => {
        PeliculaService.listaGeneroCombo()
            .then((data) => {
                console.log('GÉNEROS:', data);
                setListaGenero(data as any);
            })
            .catch(handleError);
    }, []);

    useEffect(() => {
        PeliculaService.listaActorCombo()
            .then((data) => {
                console.log('ACTORES:', data); // <-- ¿Géneros aquí? Algo está mal
                setListaActor(data as any);
            })
            .catch(handleError);
    }, []);

    useEffect(() => {
        PeliculaService.listaDirectorCombo()
            .then((data) => {
                console.log('DIRECTORES:', data); // <-- ¿Géneros aquí también?
                setListaDirector(data as any);
            })
            .catch(handleError);
    }, []);

    useEffect(() => {
        const cargarPeliculas = async () => {
            try {
                setLoading(true);
                const data = await PeliculaService.listPeliculasVista();
                if (data) setPeliculas(data);
                else setError("No se pudieron cargar las películas");
            } catch (err) {
                console.error("Error al cargar películas:", err);
                setError("Error al conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        cargarPeliculas();
    }, []);

    if (loading) {
        return (
            <VerticalLayout style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div>Cargando películas...</div>
            </VerticalLayout>
        );
    }

    if (error) {
        return (
            <VerticalLayout style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ color: 'red' }}>{error}</div>
                <Button onClick={() => window.location.reload()}>Reintentar</Button>
            </VerticalLayout>
        );
    }

    return (
        <VerticalLayout
            theme="spacing padding"
            style={{
                maxWidth: '1400px',
                margin: '2rem auto',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)'
            }}
        >
            <HorizontalLayout
                style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    padding: '0 1rem'
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        background: 'linear-gradient(45deg, var(--lumo-primary-color), var(--lumo-primary-contrast-color))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    🎬 Catálogo Cinematográfico
                </h1>
                <AdminOnly fallback={<div style={{ width: '200px' }}></div>}>                <CrearPelicula
                    onCreated={() => window.location.reload()}
                    listaGenero={listaGenero}
                    listaActor={listaActor}
                    listaDirector={listaDirector}
                />
                </AdminOnly>
            </HorizontalLayout>

            {peliculas.length === 0 ? (
                <VerticalLayout style={{ alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
                    <Icon icon="vaadin:film" style={{ opacity: 0.2, marginBottom: '1rem', fontSize: '48px' }} />
                    <p style={{ color: 'var(--lumo-secondary-text-color)' }}>No hay películas en el catálogo</p>
                </VerticalLayout>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '1.5rem',
                        width: '100%',
                        padding: '1rem'
                    }}
                >
                    {peliculas.map((pelicula) => (
                        <div
                            key={pelicula.id}
                            style={{
                                background: '#ffffff',
                                borderRadius: '12px',
                                padding: '1rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            <div style={{ borderRadius: '8px', overflow: 'hidden', height: '400px', marginBottom: '1rem' }}>
                                <img
                                    src={pelicula.imagen || 'https://via.placeholder.com/300x450?text=Poster+no+disponible'}
                                    alt={`Poster de ${pelicula.titulo}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => handleImageHover(e, true)}
                                    onMouseLeave={(e) => handleImageHover(e, false)}
                                />

                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                        padding: '1rem',
                                        color: 'white'
                                    }}
                                >
                                    <h3
                                        style={{
                                            margin: 0,
                                            fontSize: '1.2rem',
                                            fontWeight: 600,
                                            textShadow: '1px 1px 4px rgba(0,0,0,0.6)'
                                        }}
                                    >
                                        {pelicula.titulo}
                                    </h3>
                                </div>
                            </div>

                            <h3
                                style={{
                                    margin: '0.5rem 0',
                                    fontSize: '1.4rem',
                                    fontWeight: 600,
                                    color: '#1f2937'
                                }}
                            >
                                {pelicula.titulo}
                            </h3>


                            <div style={{ padding: '0 0.5rem' }}>
                                <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    {pelicula.sinopsis.slice(0, 100)}...
                                </p>


                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                    {pelicula.generos.map((g) => (
                                        <span
                                            key={g}
                                            style={{
                                                background: '#e0e7ff',
                                                color: '#3730a3',
                                                fontSize: '0.75rem',
                                                padding: '0.2rem 0.5rem',
                                                borderRadius: '999px'
                                            }}
                                        >
      {g}
    </span>
                                    ))}
                                </div>

                                {/* Info */}
                                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                    🎬 Duración: {pelicula.duracion} min <br />
                                    📅 Estreno: {pelicula.fechaEstreno}
                                </p>

                                {/* Autores */}
                                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                                    🎭 <strong>Actores:</strong> {pelicula.actores.join(', ')}<br />
                                    🎬 <strong>Director:</strong> {pelicula.directores.join(', ')}
                                </div>

                                {/* Tráiler */}
                                <Button
                                    theme="primary small"
                                    onClick={() => window.open(pelicula.trailer, '_blank')}
                                    style={{ marginTop: '0.5rem' }}
                                >
                                    🎞️ Ver tráiler
                                </Button>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </VerticalLayout>
    );
}