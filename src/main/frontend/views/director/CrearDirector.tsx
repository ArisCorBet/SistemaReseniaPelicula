import { Button, Dialog, TextField, VerticalLayout, NumberField, Notification } from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import { DirectorService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';

export function CrearDirector({ onDirectorCreado }: { onDirectorCreado: () => void }) {
  const dialogOpened = useSignal(false);
  const descripcion = useSignal('');
  const anioCarrera = useSignal<number | null>(null);

  const crear = async () => {
    try {
      if (!descripcion.value.trim() || anioCarrera.value == null) {
        Notification.show('Por favor completa todos los campos', { theme: 'error' });
        return;
      }
      await DirectorService.createDirector(descripcion.value, anioCarrera.value);
      dialogOpened.value = false;
      descripcion.value = '';
      anioCarrera.value = null;
      onDirectorCreado();
      Notification.show('Director creado exitosamente', { theme: 'success' });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Button theme="primary" onClick={() => (dialogOpened.value = true)}>
        + Nuevo Director
      </Button>
      <Dialog
        headerTitle="Nuevo Director"
        opened={dialogOpened.value}
        onOpenedChanged={(e) => (dialogOpened.value = e.detail.value)}
      >
        <VerticalLayout style={{ padding: '1rem' }}>
          <TextField
            label="Nombre"
            value={descripcion.value}
            onChange={(e) => (descripcion.value = e.target.value)}
            required
          />
          <NumberField
            label="Año carrera"
            value={anioCarrera.value}
            onValueChanged={(e) => (anioCarrera.value = e.detail.value)}
            hasControls
            min={0}
            required
          />
          <Button theme="primary" onClick={crear}>
            Guardar
          </Button>
        </VerticalLayout>
      </Dialog>
    </>
  );
}
