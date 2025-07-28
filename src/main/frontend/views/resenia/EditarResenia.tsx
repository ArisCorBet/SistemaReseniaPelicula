import React, { useState } from 'react';
import {
  Button,
  TextField,
  TextArea,
  VerticalLayout,
  NumberField,
  HorizontalLayout,
  Notification
} from '@vaadin/react-components';
import { ReseniaPeliculaService } from 'Frontend/generated/endpoints';
import ReseniaPelicula from 'Frontend/generated/com/unl/login/base/models/ReseniaPelicula';

interface EditarReseniaProps {
  resenia: ReseniaPelicula;
  onCancel: () => void;
  onUpdated: () => void;
  onError?: (message: string) => void;
}

export function EditarResenia({ 
  resenia, 
  onCancel, 
  onUpdated,
  onError
}: EditarReseniaProps) {
  const [texto, setTexto] = useState(resenia.resenia || '');
  const [puntuacion, setPuntuacion] = useState(resenia.puntuacion || 1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validarCampos = () => {
    return texto.trim() !== '' && puntuacion >= 1 && puntuacion <= 5;
  };

  const handleSubmit = async () => {
    if (!validarCampos()) {
      onError?.('Por favor completa todos los campos correctamente');
      return;
    }

    setIsSubmitting(true);

    try {
      await ReseniaPeliculaService.actualizarResenia(
        resenia.id!,
        texto,
        puntuacion,
        new Date()
      );
      
      Notification.show('Reseña actualizada correctamente', { theme: 'success' });
      onUpdated();
      onCancel();
    } catch (error) {
      console.error('Error al actualizar reseña:', error);
      onError?.('Error al actualizar la reseña. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VerticalLayout style={{ padding: 'var(--lumo-space-s)', gap: 'var(--lumo-space-m)' }}>
      <h4 style={{ margin: 0 }}>Editando Reseña</h4>

      <TextField 
        label="Autor" 
        value={resenia.autor || 'Anónimo'} 
        readonly 
      />

      <NumberField
        label="Puntuación (1-5)"
        min={1}
        max={5}
        step={0.5}
        value={puntuacion}
        onValueChanged={(e) => setPuntuacion(e.detail.value)}
        required
        errorMessage="Debe ser entre 1 y 5"
        invalid={puntuacion < 1 || puntuacion > 5}
        disabled={isSubmitting}
        helperText="1 = Mala, 5 = Excelente"
      />

      <TextArea
        label="Reseña"
        value={texto}
        onValueChanged={(e) => setTexto(e.detail.value)}
        required
        errorMessage="Este campo es requerido"
        invalid={texto.trim() === ''}
        style={{ minHeight: '150px' }}
        disabled={isSubmitting}
      />

      <HorizontalLayout style={{ justifyContent: 'flex-end', gap: 'var(--lumo-space-s)' }}>
        <Button theme="tertiary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          theme="primary"
          onClick={handleSubmit}
          disabled={!validarCampos() || isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}