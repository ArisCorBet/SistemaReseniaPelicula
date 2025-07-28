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
import { useSignal } from '@vaadin/hilla-react-signals';
import { ReseniaPeliculaService } from 'Frontend/generated/endpoints';

interface CrearReseniaProps {
  peliculaId: number;
  onReseniaCreada: () => void;
  onClose: () => void;
  onError?: (message: string) => void;
}

export function CrearResenia({ 
  peliculaId, 
  onReseniaCreada, 
  onClose,
  onError
}: CrearReseniaProps) {
  const autor = useSignal('');
  const reseniaTexto = useSignal('');
  const [puntuacion, setPuntuacion] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validarCampos = () => {
    return (
      reseniaTexto.value.trim() !== '' &&
      puntuacion !== undefined &&
      puntuacion >= 1 &&
      puntuacion <= 5
    );
  };

  const handleSubmit = async () => {
    if (!validarCampos()) {
      onError?.('Por favor completa todos los campos correctamente');
      return;
    }

    setIsSubmitting(true);

    try {
      await ReseniaPeliculaService.crearResenia(
        peliculaId,
        reseniaTexto.value,
        puntuacion!,
        new Date(),
        autor.value.trim() || 'Anónimo'
      );

      Notification.show('Reseña creada exitosamente', { theme: 'success' });
      onReseniaCreada();
      onClose();
    } catch (error) {
      console.error('Error al crear reseña:', error);
      onError?.('Error al crear la reseña. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <VerticalLayout style={{ padding: 'var(--lumo-space-s)', gap: 'var(--lumo-space-m)' }}>
      <TextField
        label="Tu nombre (opcional)"
        value={autor.value}
        onValueChanged={(e) => (autor.value = e.detail.value)}
        disabled={isSubmitting}
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
        invalid={puntuacion !== undefined && (puntuacion < 1 || puntuacion > 5)}
        disabled={isSubmitting}
        helperText="1 = Mala, 5 = Excelente"
      />

      <TextArea
        label="Tu reseña"
        value={reseniaTexto.value}
        onValueChanged={(e) => (reseniaTexto.value = e.detail.value)}
        required
        errorMessage="Este campo es requerido"
        invalid={reseniaTexto.value.trim() === ''}
        style={{ minHeight: '150px' }}
        disabled={isSubmitting}
      />

      <HorizontalLayout style={{ justifyContent: 'flex-end', gap: 'var(--lumo-space-s)' }}>
        <Button theme="tertiary" onClick={onClose} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button
          theme="primary"
          onClick={handleSubmit}
          disabled={!validarCampos() || isSubmitting}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
        </Button>
      </HorizontalLayout>
    </VerticalLayout>
  );
}