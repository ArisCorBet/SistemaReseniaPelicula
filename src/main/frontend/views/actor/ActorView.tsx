import { useEffect, useState } from 'react';
import { ActorService } from 'Frontend/generated/endpoints';
import { CrearActor } from './CrearActor';
import { EditarActor } from './EditarActor';
import { EliminarActor } from './EliminarActor';
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

type Actor = {
    idActor: number;
    nombre: string;
    anioCarrera: number;
};

export const config: ViewConfig = {
    title: 'Actores',
    menu: {
        icon: 'vaadin:hands-up',
        order: 1,
        title: 'Actores',
    },
};

export default function ActorView() {
    const [actores, setActores] = useState<Actor[]>([]);
    const [actorAEditar, setActorAEditar] = useState<Actor | null>(null);
    const [actorAEliminar, setActorAEliminar] = useState<Actor | null>(null);
    const [filtro, setFiltro] = useState('');
    const [campoFiltro, setCampoFiltro] = useState<'nombre' | 'anioCarrera'>('nombre');
    const [campoOrden, setCampoOrden] = useState<'nombre' | 'anioCarrera'>('anioCarrera');
    const [ascendente, setAscendente] = useState(true);

    useEffect(() => {
        buscarActores();
    }, [campoOrden, ascendente]);

    const buscarActores = async () => {
        try {
            if (filtro.trim() !== '') {
                const lista = await ActorService.search(campoFiltro, filtro, 0);
                setActores(Array.isArray(lista) ? lista.map(mapActor) : []);
            } else {
                const lista = await ActorService.order(campoOrden, ascendente ? 1 : 2);
                setActores(Array.isArray(lista) ? lista.map(mapActor) : []);
            }
        } catch (error) {
            console.error("Error al buscar actores:", error);
            setActores([]);
        }
    };

    const mapActor = (item: any): Actor => ({
        idActor: parseInt(item.idActor),
        nombre: item.nombre,
        anioCarrera: parseInt(item.anioCarrera)
    });

    function IndexRenderer({ model }: { model: any }) {
        return <span>{model.index + 1}</span>;
    }

    const renderEncabezado = (campo: 'nombre' | 'anioCarrera', texto: string) => (
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
                Gestión de Actores
            </h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                <ComboBox
                    label="Filtrar por"
                    items={['nombre', 'anioCarrera']}
                    value={campoFiltro}
                    onValueChanged={(e) => setCampoFiltro(e.detail.value as 'nombre' | 'anioCarrera')}
                    style={{ width: '160px' }}
                />
                <TextField
                    placeholder="Buscar"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') buscarActores();
                    }}
                />
                <Button onClick={buscarActores} theme="primary">Buscar</Button>

                <AdminOnly>
                    <CrearActor onActorCreado={buscarActores} />
                </AdminOnly>
            </div>

            <Grid
                items={actores}
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
                <GridColumn
                    path="anioCarrera"
                    header={renderEncabezado('anioCarrera', 'Año carrera')}
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
                                    onClick={() => setActorAEditar(item)}
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
                                    onClick={() => setActorAEliminar(item)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        )}
                    />
                </AdminOnly>

            </Grid>

            <AdminOnly>
                {actorAEditar && (
                    <EditarActor
                        actor={actorAEditar}
                        onCancel={() => setActorAEditar(null)}
                        onUpdated={() => {
                            setActorAEditar(null);
                            buscarActores();
                        }}
                    />
                )}
            </AdminOnly>

            <AdminOnly>
                {actorAEliminar && (
                    <EliminarActor
                        actor={actorAEliminar}
                        onCancel={() => setActorAEliminar(null)}
                        onDeleted={() => {
                            setActorAEliminar(null);
                            buscarActores();
                        }}
                    />
                )}
            </AdminOnly>
        </VerticalLayout>
    );
}