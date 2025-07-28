import { useEffect, useState } from 'react';
import { GeneroService } from 'Frontend/generated/endpoints';
import { CrearGenero } from './CrearGenero';
import { EditarGenero } from './EditarGenero';
import { EliminarGenero } from './EliminarGenero';
import { AdminOnly } from 'Frontend/components/AuthWrapper';
import {
    Button,
    ComboBox,
    TextField,
    Grid,
    GridColumn,
    VerticalLayout
} from '@vaadin/react-components';
import {ViewConfig} from "@vaadin/hilla-file-router/types.js";

export const config: ViewConfig = {
    title: 'Gestion Generos',
    menu: {
        icon: 'vaadin:file-movie',
        order: 1,
        title: 'Gestion Generos',
    },
};

type Genero = {
    idGenero: number;
    nombre: string;
};

export default function GeneroView() {
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [generoAEditar, setGeneroAEditar] = useState<Genero | null>(null);
    const [generoAEliminar, setGeneroAEliminar] = useState<Genero | null>(null);
    const [filtro, setFiltro] = useState('');
    const [campoFiltro, setCampoFiltro] = useState<'nombre'>('nombre');
    const [campoOrden, setCampoOrden] = useState<'nombre'>('nombre');
    const [ascendente, setAscendente] = useState(true);

    useEffect(() => {
        buscarGeneros();
    }, [campoOrden, ascendente]);

    const buscarGeneros = async () => {
        try {
            if (filtro.trim() !== '') {
                const lista = await GeneroService.search(campoFiltro, filtro, 0);
                setGeneros(Array.isArray(lista) ? lista.map(mapActor) : []);
            } else {
                const lista = await GeneroService.order(campoOrden, ascendente ? 1 : 2);
                setGeneros(Array.isArray(lista) ? lista.map(mapActor) : []);
            }
        } catch (error) {
            console.error("Error al buscar actores:", error);
            setGeneros([]);
        }
    };

    const mapActor = (item: any): Genero => ({
        idGenero: parseInt(item.idGenero),
        nombre: item.nombre,
    });

    function IndexRenderer({ model }: { model: any }) {
        return <span>{model.index + 1}</span>;
    }

    const renderEncabezado = (campo: 'nombre', texto: string) => (
        <div
            onClick={() => {
                if (campoOrden === campo) {
                    setAscendente(!ascendente);
                } else {
                    setCampoOrden(campo);
                    setAscendente(true);
                }
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                fontWeight: 600,
                color: campoOrden === campo ? '#1976d2' : '#333',
                transition: 'color 0.2s ease'
            }}
        >
            {texto}
            {campoOrden === campo ? (
                ascendente ? (
                    <span style={{ color: '#1976d2' }}>▲</span>
                ) : (
                    <span style={{ color: '#d32f2f' }}>▼</span>
                )
            ) : null}
        </div>
    );

    return (
        <VerticalLayout style={{ padding: '2rem', backgroundColor: '#f7f7f7' }}>
            <h2 style={{ fontSize: '24px', color: '#333', fontWeight: 'bold', marginBottom: '1rem' }}>
                Gestión de Géneros
            </h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                <ComboBox
                    label="Filtrar por"
                    items={['nombre']}
                    value={campoFiltro}
                    onValueChanged={(e) => setCampoFiltro(e.detail.value as 'nombre')}
                    style={{ width: '160px' }}
                />
                <TextField
                    placeholder="Buscar"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') buscarGeneros();
                    }}
                />
                <Button onClick={buscarGeneros} theme="primary">Buscar</Button>

                <AdminOnly>
                    <CrearGenero onGeneroCreado={buscarGeneros} />
                </AdminOnly>
            </div>

            <Grid
                items={generos}
                theme="row-stripes"
                style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginTop: '1rem'
                }}
            >
                <GridColumn header="No" renderer={IndexRenderer} />
                <GridColumn
                    path="nombre"
                    header={renderEncabezado('nombre', 'Nombre')}
                />
                <AdminOnly>
                    <GridColumn
                        header="Acciones"
                        renderer={({ item }) => (

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                    style={{
                                        backgroundColor: '#4caf50',
                                        color: 'white',
                                        fontWeight: 600,
                                        borderRadius: '6px'
                                    }}
                                    onClick={() => setGeneroAEditar(item)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        fontWeight: 600,
                                        borderRadius: '6px'
                                    }}
                                    onClick={() => setGeneroAEliminar(item)}
                                >
                                    Eliminar
                                </Button>
                            </div>

                        )}
                    />
                </AdminOnly>
            </Grid>

            <AdminOnly>
                {generoAEditar && (
                    <EditarGenero
                        genero={generoAEditar}
                        onCancel={() => setGeneroAEditar(null)}
                        onUpdated={() => {
                            setGeneroAEditar(null);
                            buscarGeneros();
                        }}
                    />
                )}
            </AdminOnly>

            <AdminOnly>
                {generoAEliminar && (
                    <EliminarGenero
                        genero={generoAEliminar}
                        onCancel={() => setGeneroAEliminar(null)}
                        onDeleted={() => {
                            setGeneroAEliminar(null);
                            buscarGeneros();
                        }}
                    />
                )}
            </AdminOnly>
        </VerticalLayout>
    );
}