import {Button,Dialog,Notification,VerticalLayout
} from '@vaadin/react-components';
import { ActorService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';
import Actor from 'Frontend/generated/com/unl/proyectogrupal/base/models/Actor';

export function EliminarActor({
  actor,
  onCancel,
  onDeleted,
}: {
  actor: Actor;
  onCancel: () => void;
  onDeleted: () => void;
}) {
  const confirmar = async () => {
    try {
      await ActorService.delete(actor.idActor); // 👈 id corregido
      Notification.show('Actor eliminado correctamente', { theme: 'success' });
      onDeleted();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
      <VerticalLayout style={{ padding: '1rem' }}>
        <h4>¿Estás seguro que deseas eliminar a {actor.nombre}?</h4> {/* 👈 nombre corregido */}
        <Button theme="error" onClick={confirmar}>Eliminar</Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </VerticalLayout>
    </Dialog>
  );
}
