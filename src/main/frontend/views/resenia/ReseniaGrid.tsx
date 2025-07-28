import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  GridColumn, 
  Button, 
  HorizontalLayout,
  Notification
} from '@vaadin/react-components';
import { ReseniaPeliculaService } from 'Frontend/generated/endpoints';
import ReseniaPelicula from 'Frontend/generated/com/unl/login/base/models/ReseniaPelicula';
import { format } from 'date-fns';

interface ReseniaGridProps {
  peliculaId: number;
  onEditar: (resenia: ReseniaPelicula) => void;
  refreshTrigger: number;
  usuarioActual?: string;
  onError?: (message: string) => void;
}

export function ReseniaGrid({ 
  peliculaId, 
  onEditar, 
  refreshTrigger, 
  usuarioActual,
  onError
}: ReseniaGridProps) {
  const [resenias, setResenias] = useState<ReseniaPelicula[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarResenias = async () => {
    setLoading(true);
    try {
      const data = await ReseniaPeliculaService.obtenerReseniasDePelicula(peliculaId);
      setResenias(data || []);
    } catch (error) {
      console.error('Error cargando reseñas:', error);
      onError?.('Error al cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarResenias();
  }, [peliculaId, refreshTrigger]);

  const handleEliminar = async (id: number) => {
    try {
      if (usuarioActual) {
        const puedeEliminar = await ReseniaPeliculaService.usuarioPuedeEliminar(id, usuarioActual);
        if (!puedeEliminar) {
          throw new Error('No tienes permiso para eliminar esta reseña');
        }
      }

      await ReseniaPeliculaService.eliminarResenia(id);
      Notification.show('Reseña eliminada correctamente', { theme: 'success' });
      cargarResenias();
    } catch (error: any) {
      console.error('Error al eliminar reseña:', error);
      onError?.(error.message || 'Error al eliminar la reseña');
    }
  };

  if (loading) {
    return <div style={{ padding: 'var(--lumo-space-m)' }}>Cargando reseñas...</div>;
  }

  if (resenias.length === 0) {
    return (
      <div style={{ 
        padding: 'var(--lumo-space-m)',
        textAlign: 'center',
        color: 'var(--lumo-secondary-text-color)'
      }}>
        No hay reseñas para esta película. ¡Sé el primero en opinar!
      </div>
    );
  }

  return (
    <Grid items={resenias} theme="row-stripes" style={{ width: '100%' }}>
      <GridColumn 
        header="Autor" 
        renderer={({ item }) => (
          <div style={{ fontWeight: 'bold' }}>
            {item.autor || 'Anónimo'}
          </div>
        )}
      />
      
      <GridColumn 
        header="Fecha" 
        renderer={({ item }) => (
          <div style={{ fontSize: 'var(--lumo-font-size-s)' }}>
            {item.fechaResenia 
              ? format(new Date(item.fechaResenia), 'dd/MM/yyyy HH:mm') 
              : 'Sin fecha'}
          </div>
        )}
      />
      
      <GridColumn 
        header="Puntuación" 
        renderer={({ item }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              color: 'var(--lumo-primary-text-color)', 
              marginRight: 'var(--lumo-space-xs)'
            }}>
              {item.puntuacion.toFixed(1)}
            </span>
            <div style={{ color: 'var(--lumo-primary-color)' }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.floor(item.puntuacion) ? '★' : '☆'}
                </span>
              ))}
            </div>
          </div>
        )}
      />
      
      <GridColumn 
        header="Comentario" 
        renderer={({ item }) => (
          <div style={{ whiteSpace: 'pre-line', lineHeight: '1.5' }}>
            {item.resenia}
          </div>
        )}
        flexGrow={1}
      />
      
      {usuarioActual && (
        <GridColumn
          header="Acciones"
          renderer={({ item }) => (
            <HorizontalLayout theme="spacing-xs">
              <Button 
                theme="tertiary small" 
                onClick={() => onEditar(item)}
                disabled={item.autor !== usuarioActual}
              >
                Editar
              </Button>
              <Button 
                theme="error tertiary small" 
                onClick={() => handleEliminar(item.id!)}
                disabled={item.autor !== usuarioActual}
              >
                Eliminar
              </Button>
            </HorizontalLayout>
          )}
          autoWidth
        />
      )}
    </Grid>
  );
}