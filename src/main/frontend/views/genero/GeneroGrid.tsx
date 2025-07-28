import { Grid, GridColumn } from '@vaadin/react-components';
import { Button } from '@vaadin/react-components';
import Genero from 'Frontend/generated/com/unl/proyectogrupal/base/models/Genero';

export function GeneroGrid({
  generos,
  onSeleccionar,
}: {
  generos: Genero[];
  onSeleccionar: (genero: Genero, accion: 'editar' | 'eliminar') => void;
}) {
  return (
    <div
      style={{
        width: '100%',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
      }}
    >
      <Grid
        items={generos}
        theme="row-stripes column-borders"
        style={{ height: '100%', minHeight: '300px' }}
      >
        <GridColumn
          header="Nro"
          autoWidth
          flexGrow={0}
          renderer={({ model }) => <span>{model.index + 1}</span>}
        />
        <GridColumn path="nombre" header="Nombre" />
        <GridColumn
          header="Acciones"
          autoWidth
          flexGrow={0}
          renderer={({ item }) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button theme="primary small" onClick={() => onSeleccionar(item, 'editar')}>
                Editar
              </Button>
              <Button theme="error small" onClick={() => onSeleccionar(item, 'eliminar')}>
                Eliminar
              </Button>
            </div>
          )}
        />
      </Grid>
    </div>
  );
}
