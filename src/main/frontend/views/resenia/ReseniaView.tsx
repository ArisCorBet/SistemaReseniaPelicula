import React, { useState } from 'react';
import {Button, Dialog, VerticalLayout, Notification, HorizontalLayout} from '@vaadin/react-components';
import { CrearResenia } from './CrearResenia';
import { EditarResenia } from './EditarResenia';
import { ReseniaGrid } from './ReseniaGrid';
import ReseniaPelicula from 'Frontend/generated/com/unl/login/base/models/ReseniaPelicula';
import { ReseniaPeliculaService } from 'Frontend/generated/endpoints';

interface ReseniaViewProps {
  peliculaId: number;
  usuarioActual?: string;
}

export default function ReseniaView({ peliculaId, usuarioActual }: ReseniaViewProps) {
  const [reseniaEditando, setReseniaEditando] = useState<ReseniaPelicula | null>(null);
  const [showCrearDialog, setShowCrearDialog] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReseniaCreada = () => {
    setRefreshTrigger(prev => prev + 1);
    setShowCrearDialog(false);
  };

  const handleReseniaActualizada = () => {
    setRefreshTrigger(prev => prev + 1);
    setReseniaEditando(null);
  };

  const handleError = (message: string) => {
    Notification.show(message, { theme: 'error' });
  };

  return (
    <VerticalLayout 
      theme="spacing" 
      style={{ 
        width: '100%', 
        padding: 'var(--lumo-space-m)',
        backgroundColor: 'var(--lumo-contrast-5pct)',
        borderRadius: 'var(--lumo-border-radius-l)'
      }}
    >
      <HorizontalLayout style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h3 style={{ margin: 0 }}>Reseñas</h3>
        
        {usuarioActual && (
          <Button 
            theme="primary" 
            onClick={() => setShowCrearDialog(true)}
            style={{ marginLeft: 'auto' }}
          >
            + Nueva Reseña
          </Button>
        )}
      </HorizontalLayout>

      <ReseniaGrid
        peliculaId={peliculaId}
        onEditar={setReseniaEditando}
        refreshTrigger={refreshTrigger}
        usuarioActual={usuarioActual}
        onError={handleError}
      />

      {/* Diálogo para crear reseña */}
      <Dialog
        opened={showCrearDialog}
        onOpenedChanged={({ detail }) => !detail.value && setShowCrearDialog(false)}
        headerTitle="Crear Nueva Reseña"
        modal
      >
        <CrearResenia 
          peliculaId={peliculaId} 
          onReseniaCreada={handleReseniaCreada}
          onClose={() => setShowCrearDialog(false)}
          onError={handleError}
        />
      </Dialog>

      {/* Diálogo para editar reseña */}
      <Dialog
        opened={!!reseniaEditando}
        onOpenedChanged={({ detail }) => !detail.value && setReseniaEditando(null)}
        headerTitle="Editar Reseña"
        modal
      >
        {reseniaEditando && (
          <EditarResenia
            resenia={reseniaEditando}
            onCancel={() => setReseniaEditando(null)}
            onUpdated={handleReseniaActualizada}
            onError={handleError}
          />
        )}
      </Dialog>
    </VerticalLayout>
  );
}