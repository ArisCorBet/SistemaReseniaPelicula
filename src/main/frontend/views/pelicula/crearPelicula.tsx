import React, { useState, useCallback } from 'react';
import {
  Button,
  Dialog,
  TextField,
  VerticalLayout,
  Notification,
  DatePicker,
  MultiSelectComboBox
} from '@vaadin/react-components';
import { PeliculaService } from "Frontend/generated/endpoints";

type CrearPeliculaProps = {
  onCreated?: () => void;
  listaGenero: { value: string; label: string }[];
  listaActor: { value: string; label: string }[];
  listaDirector: { value: string; label: string }[];
};

export function CrearPelicula({ onCreated, listaGenero, listaActor, listaDirector }: CrearPeliculaProps) {
  // Estados para controlar la UI
  const [dialogOpened, setDialogOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estado del formulario
  const [form, setForm] = useState({
    titulo: '',
    sinopsis: '',
    duracion: '' as number | '',
    trailer: '',
    imagen: '',
    fechaEstreno: null as string | null,
    generos: [] as string[],
    actores: [] as string[],
    directores: [] as string[]
  });

  // Handler para cambios simples
  const handleChange = (field: keyof typeof form, value: any) => {
    setForm(prev => prev[field] === value ? prev : { ...prev, [field]: value });
  };


  // Handler para MultiSelect
  const handleMultiSelectChange = (field: 'generos' | 'actores' | 'directores') =>
      (e: CustomEvent<{ value: Array<{ value: string }> }>) => {
        const newValues = e.detail.value.map(item => item.value);
        setForm(prev => {
          const current = JSON.stringify(prev[field]);
          const next = JSON.stringify(newValues);
          return current === next ? prev : { ...prev, [field]: newValues };
        });
      };

  // Resetear formulario y cerrar diálogo
  const resetForm = useCallback(() => {
    setForm({
      titulo: '',
      sinopsis: '',
      duracion: '',
      trailer: '',
      imagen: '',
      fechaEstreno: null,
      generos: [],
      actores: [],
      directores: []
    });
    setDialogOpened(false);
  }, []);

  // Crear nueva película

  const handleSubmit = async () => {
    setIsLoading(true); // Activar estado de carga

    try {
      // Validación básica de campos requeridos
      if (!form.titulo.trim() || !form.sinopsis.trim() || !form.trailer.trim()) {
        throw new Error("Complete todos los campos requeridos");
      }

      if (!form.fechaEstreno) {
        throw new Error("Seleccione una fecha de estreno");
      }

      // Conversión segura de IDs a números
      const generosIds = form.generos.map(id => parseInt(id)).filter(id => !isNaN(id));
      const directoresIds = form.directores.map(id => parseInt(id)).filter(id => !isNaN(id));
      const actoresIds = form.actores.map(id => parseInt(id)).filter(id => !isNaN(id));

      // Validación de relaciones
      if (generosIds.length === 0 || directoresIds.length === 0 || actoresIds.length === 0) {
        throw new Error("Seleccione al menos un género, director y actor");
      }

      // Validación de duración
      if (!form.duracion || form.duracion <= 0) {
        throw new Error("La duración debe ser mayor a 0");
      }
      const handleSubmit = async () => {
        // ... validaciones previas

        // Validar fecha
        if (!form.fechaEstreno || isNaN(new Date(form.fechaEstreno).getTime())) {
          throw new Error("La fecha de estreno no es válida");
        }

        // Crear fecha asegurando formato correcto
        const fechaEstreno = new Date(form.fechaEstreno).toISOString();

        await PeliculaService.createPelicula(
            form.titulo,
            form.sinopsis,
            Number(form.duracion),
            form.trailer,
            form.imagen,
            fechaEstreno,  // Ahora en la posición correcta (6to parámetro)
            generosIds,
            directoresIds,
            actoresIds
        );
        // ...
      }
      // Envío al backend
      await PeliculaService.createPelicula(
          form.titulo,
          form.sinopsis,
          Number(form.duracion),
          form.trailer,
          new Date(form.fechaEstreno),
          form.imagen,
          generosIds,
          directoresIds,
          actoresIds
      );

      // Éxito - mostrar notificación y resetear
      Notification.show("Película creada con éxito", {
        theme: "success",
        position: "bottom-center",
        duration: 3000
      });

      resetForm();
      onCreated?.(); // Llamar a callback si existe

    } catch (error) {
      console.error("Error al guardar:", error);

      // Mostrar error al usuario
      Notification.show(
          error instanceof Error ? error.message : "Error al guardar la película",
          {
            theme: "error",
            position: "bottom-center",
            duration: 5000
          }
      );

    } finally {
      setIsLoading(false); // Desactivar estado de carga
    }
  };
  return (
      <>
        <Button
            theme="primary"
            onClick={() => setDialogOpened(true)}
            disabled={isLoading}
        >
          + Agregar Película
        </Button>

        <Dialog
            headerTitle="Nueva Película"
            opened={dialogOpened}
            onOpenedChanged={({ detail }) => detail.value ? setDialogOpened(true) : resetForm()}
            footer={
              <>
                <Button onClick={resetForm} disabled={isLoading}>
                  Cancelar
                </Button>
                <Button
                    theme="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <span style={{ display: 'flex', alignItems: 'center' }}>
      <span className="spinner"></span> Guardando...
    </span>
                  ) : (
                      'Guardar'
                  )}
                </Button>
              </>
            }
        >
          <VerticalLayout style={{ width: '400px', padding: '16px', gap: '16px' }}>
            <TextField
                label="Título"
                value={form.titulo}
                onValueChanged={(e) => handleChange('titulo', e.detail.value)}
                required
            />

            <TextField
                label="Sinopsis"
                value={form.sinopsis}
                onValueChanged={(e) => handleChange('sinopsis', e.detail.value)}
                required
            />

            <TextField
                label="Duración (minutos)"
                type="number"
                value={form.duracion === '' ? '' : form.duracion.toString()}
                onValueChanged={(e) => handleChange('duracion', Number(e.detail.value))}
                min={1}
                required
            />

            <TextField
                label="Trailer (URL)"
                value={form.trailer}
                onValueChanged={(e) => handleChange('trailer', e.detail.value)}
                required
            />

            <DatePicker
                label="Fecha de estreno"
                value={form.fechaEstreno}
                onValueChanged={(e) => handleChange('fechaEstreno', e.detail.value)}
                required
            />
            <TextField
                label="Imagen (URL)"
                value={form.imagen}
                onValueChanged={(e) => handleChange('imagen', e.detail.value)}
                required
            />
            <MultiSelectComboBox
                label="Géneros"
                items={listaGenero}
                selectedItems={form.generos.map(value => ({ value }))}
                onSelectedItemsChanged={handleMultiSelectChange('generos')}
                itemLabelPath="label"
                itemValuePath="value"
                required
            />

            <MultiSelectComboBox
                label="Actores"
                items={listaActor}
                selectedItems={form.actores.map(value => ({ value }))}
                onSelectedItemsChanged={handleMultiSelectChange('actores')}
                itemLabelPath="label"
                itemValuePath="value"
                required
            />

            <MultiSelectComboBox
                label="Directores"
                items={listaDirector}
                selectedItems={form.directores.map(value => ({ value }))}
                onSelectedItemsChanged={handleMultiSelectChange('directores')}
                itemLabelPath="label"
                itemValuePath="value"
                required
            />
          </VerticalLayout>
        </Dialog>
      </>
  );
}