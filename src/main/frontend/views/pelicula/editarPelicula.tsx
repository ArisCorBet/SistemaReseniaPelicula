// EditarPelicula.tsx
import {
  Button,
  DatePicker,
  Dialog,
  Notification,
  TextField,
  VerticalLayout,
  CheckboxGroup,
  Checkbox
} from '@vaadin/react-components';
import { useState } from 'react';
import Pelicula from 'Frontend/generated/com/unl/login/base/models/Pelicula';
import { PeliculaService } from 'Frontend/generated/endpoints';
import handleError from 'Frontend/views/_ErrorHandler';

type EditarPeliculaEntryFormProps = {
  arguments: Pelicula;
  onUpdated?: () => void;
  listaGenero: { value: string; label: string }[];
};

export function EditarPelicula({
  arguments: pelicula,
  onUpdated,
  listaGenero
}: EditarPeliculaEntryFormProps) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const [titulo, setTitulo] = useState(pelicula.titulo ?? '');
  const [sinopsis, setSinopsis] = useState(pelicula.sinopsis ?? '');
  const [duracion, setDuracion] = useState<number | ''>(pelicula.duracion ?? '');
  const [trailer, setTrailer] = useState(pelicula.trailer ?? '');
  const [fechaEstreno, setFechaEstreno] = useState<string | null>(
    pelicula.fechaEstreno ? pelicula.fechaEstreno.toString() : null
  );
  // Ahora utilizamos un array para los checks (tomaremos el primer valor)
  const [selectedGeneros, setSelectedGeneros] = useState<string[]>(
    pelicula.idGenero ? [pelicula.idGenero.toString()] : []
  );

  const updatePelicula = async () => {
    try {
      if (
        titulo.trim().length === 0 ||
        sinopsis.trim().length === 0 ||
        !duracion ||
        duracion <= 0 ||
        trailer.trim().length === 0 ||
        !fechaEstreno ||
        selectedGeneros.length === 0
      ) {
        Notification.show('Faltan datos obligatorios', {
          duration: 5000,
          position: 'top-center',
          theme: 'error'
        });
        return;
      }

      await PeliculaService.updatePelicula(
        pelicula.id!,
        titulo,
        sinopsis,
        duracion,
        trailer,
        new Date(fechaEstreno),
        parseInt(selectedGeneros[0], 10)
      );

      Notification.show('Película actualizada', {
        duration: 5000,
        position: 'bottom-end',
        theme: 'success'
      });
      setDialogOpened(false);
      onUpdated?.();
    } catch (error) {
      console.error(error);
      handleError(error);
    }
  };

  return (
    <>
      <Dialog
        modeless
        headerTitle="Editar Película"
        opened={dialogOpened}
        onOpenedChanged={({ detail }) => setDialogOpened(detail.value)}
        footer={
          <>
            <Button onClick={() => setDialogOpened(false)}>Cancelar</Button>
            <Button onClick={updatePelicula} theme="primary">
              Actualizar
            </Button>
          </>
        }
      >
        <VerticalLayout style={{ alignItems: 'stretch', width: '18rem', maxWidth: '100%' }}>
          <TextField
            label="Nombre de la película"
            value={titulo}
            onValueChanged={(e) => setTitulo(e.detail.value)}
          />
          <TextField
            label="Sinopsis"
            value={sinopsis}
            onValueChanged={(e) => setSinopsis(e.detail.value)}
          />
          <TextField
            label="Duración (min)"
            type="number"
            value={duracion === '' ? '' : duracion.toString()}
            onValueChanged={(e) => setDuracion(Number(e.detail.value))}
          />
          <TextField
            label="Trailer (link YouTube)"
            value={trailer}
            onValueChanged={(e) => setTrailer(e.detail.value)}
          />
          <DatePicker
            label="Fecha de estreno"
            value={fechaEstreno}
            onValueChanged={(e) => setFechaEstreno(e.detail.value)}
          />
          <CheckboxGroup
            label="Género"
            value={selectedGeneros}
            onValueChanged={(e) => setSelectedGeneros(e.detail.value)}
            theme="vertical"
          >
            {listaGenero.map(({ value, label }) => (
              <Checkbox key={value} value={value} label={label} />
            ))}
          </CheckboxGroup>
        </VerticalLayout>
      </Dialog>
      <Button onClick={() => setDialogOpened(true)}>Editar</Button>
    </>
  );
}
