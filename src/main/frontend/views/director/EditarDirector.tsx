import {
  Button,
  Dialog,
  Notification,
  TextField,
  VerticalLayout,
  NumberField,
} from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import Director from 'Frontend/generated/com/unl/proyectogrupal/base/models/Director';
import { DirectorService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';

export function EditarDirector({
  director,
  onCancel,
  onUpdated,
}: {
  director: Director;
  onCancel: () => void;
  onUpdated: () => void;
}) {
  const nombre = useSignal(director.nombre);
  const anioCarrera = useSignal(String(director.aniosCarrera));

  const guardar = async () => {
    if (!nombre.value.trim() || !anioCarrera.value.trim()) {
      Notification.show('Por favor completa todos los campos', { theme: 'error' });
      return;
    }

    try {
      await DirectorService.updateDirector(
        director.idDirector,
        nombre.value,
        Number(anioCarrera.value)
      );
      Notification.show('Director actualizado correctamente', { theme: 'success' });
      onUpdated();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Dialog opened onOpenedChanged={(e) => !e.detail.value && onCancel()}>
      <VerticalLayout style={{ padding: '1rem' }}>
        <h4>Editar Director</h4>
        <TextField
          label="Nombre"
          value={nombre.value}
          onChange={(e) => (nombre.value = e.target.value)}
        />
        <NumberField
          label="Año carrera"
          value={Number(anioCarrera.value)}
          onValueChanged={(e) =>
            (anioCarrera.value = e.detail.value !== null ? String(e.detail.value) : '')
          }
        />
        <Button theme="primary" onClick={guardar}>
          Guardar
        </Button>
        <Button onClick={onCancel}>Cancelar</Button>
      </VerticalLayout>
    </Dialog>
  );
}
