import Persona from 'Frontend/generated/com/unl/proyectogrupal/base/models/Persona';
import {useCallback, useEffect, useState} from "react";
import {PersonaService} from "Frontend/generated/endpoints";
import {CrearUSuario} from './CrearUsuario';
import {EditarUsuario} from './EditarUsuario';
import {EliminarUsuario} from './EliminarUsuario';

import {
    Button,
    ComboBox,
    TextField,
    Grid,
    GridColumn,
    VerticalLayout, GridItemModel, HorizontalLayout, Select, Icon, GridSortColumn
} from '@vaadin/react-components';
import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import {Notification} from '@vaadin/react-components/Notification';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Group, ViewToolbar } from 'Frontend/components/ViewToolbar';
import {UsuarioGrid} from "Frontend/views/Usuario/UsuarioGrid";
import handleError from "Frontend/views/_ErrorHandler";

export const config: ViewConfig = {
    title: 'Registro de personas',
    menu: {
        icon: 'vaadin:users',
        order: 1,
        title: 'Registro de personas',
    },
};

type Usuario ={
    idUsuario: number;
    usuario: string;
    telefono: string;
    edad: number;
    correo: string;
    contrasenia: string;
};
export default function UsuarioView() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [usuarioAEditar, setUsuarioAEditar] = useState<Usuario | null>(null);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState<Usuario | null>(null);    const createDialogOpened = useSignal(false);
    const [filtro, setFiltro] = useState('');
    const [campoFiltro, setCampoFiltro] = useState<'nombre'>('nombre');
    const [campoOrden, setCampoOrden] = useState<'nombre'>('nombre');
    const [ascendente, setAscendente] = useState(true);

    useEffect(() => {
        buscarUsuarios();
    }, [campoOrden, ascendente]);

    const buscarUsuarios = async () => {
        try {
            if (filtro.trim() !== '') {
                const lista = await PersonaService.search(campoFiltro, filtro, 0);
                setUsuarios(Array.isArray(lista) ? lista.map(mapUsuario) : []);
            } else {
                const lista = await PersonaService.order(campoOrden, ascendente ? 1 : 2);
                setUsuarios(Array.isArray(lista) ? lista.map(mapUsuario) : []);
            }
        } catch (error) {
            console.error("Error al buscar usuarios:", error);
            setUsuarios([]);
        }
    };


    const [items, setItems] = useState([]);
    useEffect(() => {
        PersonaService.listAll().then(function (data) {
            //items.values = data;
            setItems(data);
        });
    }, []);

    const loadData = useCallback(() => {
        PersonaService.listAll().then(data => {
            setItems(data);
        });
    }, []);

    const order = (event, columnId) => {
        console.log(event);
        const direction = event.detail.value;
        // Custom logic based on the sorting direction
        console.log(`Sort direction changed for column ${columnId} to ${direction}`);

        var dir = (direction == 'asc') ? 1 : 2;
        PersonaService.order(columnId, dir).then(function (data) {
            setItems(data);
        });
    }
    const search = async () => {

        try {
            console.log(criterio.value+" "+texto.value);
            PersonaService.search(criterio.value, texto.value, 0).then(function (data) {
                setItems(data);
            });

            criterio.value = '';
            texto.value = '';

            Notification.show('Busqueda realizada', { duration: 5000, position: 'bottom-end', theme: 'success' });


        } catch (error) {
            console.log(error);
            handleError(error);
        }
    };

    const criterio = useSignal('');
    const texto = useSignal('');
    const itemSelect = [
        {
            label: 'Usuario',
            value: 'usuario',
        },
        {
            label: 'Telefono',
            value: 'telefono',
        },
        {
            label: 'Edad',
            value: 'edad',
        },
        {
            label: 'Correo',
            value: 'correo'

        }
    ];
    function indexIndex({model}:{model:GridItemModel<Persona>}) {
        return (
            <span>
        {model.index + 1}
      </span>
        );
    }

    function indexLink({ item}: { item: Persona }) {

        return (
            <span>
        <Button>EDITAR</Button>
      </span>
        );
    }

    const mapUsuario = (item: any): Persona => ({
        id: parseInt(item.id),
        usuario: item.usuario,
        edad: parseInt(item.edad),
        telefono: item.telefono,
        correo: item.correo
    });


    return (
        <main className="w-full h-full flex flex-col box-border gap-s p-m">
            <ViewToolbar title="Lista Canciones">
                <Group>
                    <CrearUSuario onUsuarioCreado={loadData}/>
                </Group>
            </ViewToolbar>
            <HorizontalLayout theme="spacing">
                <Select items={itemSelect}
                        value={criterio.value}
                        onValueChanged={(evt) => (criterio.value = evt.detail.value)}
                        placeholder="Selecione un criterio">
                </Select>

                <TextField
                    placeholder="Search"
                    style={{ width: '50%' }}
                    value={texto.value}
                    onValueChanged={(evt) => (texto.value = evt.detail.value)}
                >
                    <Icon slot="prefix" icon="vaadin:search" />
                </TextField>
                <Button onClick={search} theme="primary">
                    BUSCAR
                </Button>
            </HorizontalLayout>
            <Grid items={items}>
                <GridColumn header="Nro" renderer={indexIndex} />
                <GridSortColumn path="usuario" header="Nombre" onDirectionChanged={(e) => order(e, "usuario")} />
                <GridSortColumn path="edad" header="Edad" onDirectionChanged={(e) => order(e, "edad")} />
                <GridSortColumn path="telefono" header="Teléfono" onDirectionChanged={(e) => order(e, "telefono")} />
                <GridSortColumn path="correo" header="Correo" onDirectionChanged={(e) => order(e, "correo")} />
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
                                        onClick={() => setUsuarioAEditar(item)}
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
                                        onClick={() => setUsuarioAEliminar(item)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            )}
                />
            </Grid>

            {usuarioAEditar && (
                <EditarUsuario
                    persona={usuarioAEditar}
                    onCancel={() => setUsuarioAEditar(null)}
                    onUpdated={() => {
                        setUsuarioAEditar(null);
                        buscarUsuarios();
                    }}
                />
            )}

            {usuarioAEliminar && (
                <EliminarUsuario
                    persona={usuarioAEliminar}
                    onCancel={() => setUsuarioAEliminar(null)}
                    onDeleted={() => {
                        setUsuarioAEliminar(null);
                        buscarUsuarios();
                    }}
                />
            )}
    </main>
);
}