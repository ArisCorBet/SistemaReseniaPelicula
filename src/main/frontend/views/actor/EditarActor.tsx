import {
  Button,
  Dialog,
  Notification,
  TextField,
  VerticalLayout,
  NumberField,
} from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import Actor from 'Frontend/generated/com/unl/proyectogrupal/base/models/Actor';
import { ActorService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';

export function EditarActor({
  actor,
  onCancel,
  onUpdated,
}: {
  actor: Actor;
  onCancel: () => void;
  onUpdated: () => void;
}) {
  const nombre = useSignal(actor.nombre);
  const anioCarrera = useSignal(String(actor.anioCarrera));

  const guardar = async () => {
    try {
      await ActorService.updateActor(actor.idActor, nombre.value, Number(anioCarrera.value));
      Notification.show('Actor actualizado correctamente', { theme: 'success' });
      onUpdated();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
      <VerticalLayout style={{ padding: '1rem' }}>
        <h4>Editar Actor</h4>
        <TextField label="Nombre" value={nombre.value} onChange={(e) => (nombre.value = e.target.value)} />
        <NumberField
          label="Año carrera"
          value={Number(anioCarrera.value)}
          onValueChanged={(e) => (anioCarrera.value = String(e.detail.value))}
        />
        <Button theme="primary" onClick={guardar}>
          Guardar
        </Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </VerticalLayout>
    </Dialog>
  );
}
