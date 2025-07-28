import { useEffect, useState } from 'react';
import { DirectorService } from 'Frontend/generated/endpoints';
import { CrearDirector } from './CrearDirector';
import { EditarDirector } from './EditarDirector';
import { EliminarDirector } from './EliminarDirector';
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
    title: 'Directores',
    menu: {
        icon: 'vaadin:book',
        order: 1,
        title: 'Directores',
    },
};

type Director = {
    idDirector: number;
    nombre: string;
    anioCarrera: number;
};

export default function DirectorView() {
    const [directores, setDirectores] = useState<Director[]>([]);
    const [directorAEditar, setDirectorAEditar] = useState<Director | null>(null);
    const [directorAEliminar, setDirectorAEliminar] = useState<Director | null>(null);
    const [filtro, setFiltro] = useState('');
    const [campoFiltro, setCampoFiltro] = useState<'nombre' | 'anioCarrera'>('nombre');
    const [campoOrden, setCampoOrden] = useState<'nombre' | 'anioCarrera'>('anioCarrera');
    const [ascendente, setAscendente] = useState(true);

    useEffect(() => {
        buscarDirectores();
    }, [campoOrden, ascendente]);

    const buscarDirectores = async () => {
        try {
            if (filtro.trim() !== '') {
                const lista = await DirectorService.search(campoFiltro, filtro, 0);
                setDirectores(Array.isArray(lista) ? lista.map(mapDirector) : []);
            } else {
                const lista = await DirectorService.order(campoOrden, ascendente ? 1 : 2);
                setDirectores(Array.isArray(lista) ? lista.map(mapDirector) : []);
            }
        } catch (error) {
            console.error("Error al buscar directores:", error);
            setDirectores([]);
        }
    };

    const mapDirector = (item: any): Director => ({
        idDirector: parseInt(item.idDirector),
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
                Gestión de Directores
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
                        if (e.key === 'Enter') buscarDirectores();
                    }}
                />
                <Button onClick={buscarDirectores} theme="primary">Buscar</Button>

                <AdminOnly>
                    <CrearDirector onDirectorCreado={buscarDirectores} />
                </AdminOnly>
            </div>

            <Grid
                items={directores}
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
                                    onClick={() => setDirectorAEditar(item)}
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
                                    onClick={() => setDirectorAEliminar(item)}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        )}
                    />
                </AdminOnly>

            </Grid>

            <AdminOnly>
                {directorAEditar && (
                    <EditarDirector
                        director={directorAEditar}
                        onCancel={() => setDirectorAEditar(null)}
                        onUpdated={() => {
                            setDirectorAEditar(null);
                            buscarDirectores();
                        }}
                    />
                )}
            </AdminOnly>

            <AdminOnly>
                {directorAEliminar && (
                    <EliminarDirector
                        director={directorAEliminar}
                        onCancel={() => setDirectorAEliminar(null)}
                        onDeleted={() => {
                            setDirectorAEliminar(null);
                            buscarDirectores();
                        }}
                    />
                )}
            </AdminOnly>
        </VerticalLayout>
    );
}