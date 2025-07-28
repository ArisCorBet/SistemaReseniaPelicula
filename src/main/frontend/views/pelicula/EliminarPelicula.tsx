import {Button,Dialog,Notification,VerticalLayout
} from '@vaadin/react-components';
import { GeneroService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';
import Genero from 'Frontend/generated/com/unl/login/base/models/Genero';

export function EliminarPelicula({
  genero,
  onCancel,
  onDeleted,
}: {
  genero: Genero;
  onCancel: () => void;
  onDeleted: () => void;
}) {
  const confirmar = async () => {
    try {
      await GeneroService.delete(genero.idGenero); // 👈 id corregido
      Notification.show('Genero eliminado correctamente', { theme: 'success' });
      onDeleted();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
      <VerticalLayout style={{ padding: '1rem' }}>
        <h4>¿Estás seguro que deseas eliminar a {genero.nombre}?</h4> {/* 👈 nombre corregido */}
        <Button theme="error" onClick={confirmar}>Eliminar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </VerticalLayout>
    </Dialog>
  );
}
