import {
  Button,
  Dialog,
  TextField,
  VerticalLayout,
  NumberField,
  Notification
} from '@vaadin/react-components';
import { useSignal } from '@vaadin/hilla-react-signals';
import {ActorService, GeneroService} from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';

export function CrearGenero({ onGeneroCreado }: { onGeneroCreado: () => void }) {
  const dialogOpened = useSignal(false);
  const nombre = useSignal('');

  const crear = async () => {
    try {
      if (!nombre.value.trim()) {
        Notification.show('Por favor completa todos los campos', { theme: 'error' });
        return;
      }
      await GeneroService.createGenero(nombre.value);
      dialogOpened.value = false;
      nombre.value = '';
      onGeneroCreado();
      Notification.show('Genero creado exitosamente', { theme: 'success' });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <Button theme="primary" onClick={() => (dialogOpened.value = true)}>
        + Nuevo Genero
      </Button>
      <Dialog
        headerTitle="Nuevo Genero"
        opened={dialogOpened.value}
        onOpenedChanged={(e) => (dialogOpened.value = e.detail.value)}
      >
        <VerticalLayout style={{ padding: '1rem' }}>
          <TextField
            label="Nombre"
            value={nombre.value}
            onChange={(e) => (nombre.value = e.target.value)}
          />
          <Button theme="primary" onClick={crear}>
            Guardar
          </Button>
        </VerticalLayout>
      </Dialog>
    </>
  );
}
