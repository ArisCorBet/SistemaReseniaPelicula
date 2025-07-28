import { Grid, GridColumn } from '@vaadin/react-components';
import { Button } from '@vaadin/react-components';
import Director from 'Frontend/generated/com/unl/proyectogrupal/base/models/Director';

export function DirectorGrid({
  directores,
  onSeleccionar,
}: {
  directores: Director[];
  onSeleccionar: (director: Director, accion: 'editar' | 'eliminar') => void;
}) {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: '95%',
        marginTop: '1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        minHeight: '600px' // ⬅️ aumenta este valor si lo deseas más alto
      }}>
        <Grid items={directores} theme="row-stripes column-borders" style={{ height: '100%' }}>
          <GridColumn
            header="Nro"
            autoWidth
            flexGrow={0}
            renderer={({ model }) => <span>{model.index + 1}</span>}
          />
          <GridColumn path="nombre" header="Nombre" />
          <GridColumn path="aniosCarrera" header="Año Carrera" />
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
    </div>
  );
}
