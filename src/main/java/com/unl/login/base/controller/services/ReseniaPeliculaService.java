package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoReseniaPelicula;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.ReseniaPelicula;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.util.Date;

@BrowserCallable
@AnonymousAllowed
public class ReseniaPeliculaService {
    private final DaoReseniaPelicula dao;

    public ReseniaPeliculaService() {
        this.dao = new DaoReseniaPelicula();
    }

    public ReseniaPelicula crearResenia(Integer idPelicula, String contenido, 
                                     float puntuacion, String autor) {
        validarDatosResenia(idPelicula, contenido, puntuacion);
        
        ReseniaPelicula nueva = new ReseniaPelicula();
        nueva.setIdPelicula(idPelicula);
        nueva.setResenia(contenido);
        nueva.setPuntuacion(puntuacion);
        nueva.setAutor(autor != null ? autor : "Anónimo");
        
        dao.setObj(nueva);
        if (!dao.save()) {
            throw new RuntimeException("Error al guardar la reseña");
        }
        return nueva;
    }

    public ReseniaPelicula actualizarResenia(Integer id, String contenido, 
                                          float puntuacion) {
        validarDatosResenia(1, contenido, puntuacion); // ID película dummy para validación
        
        LinkedList<ReseniaPelicula> resenias = dao.getLista_resenias();
        for (int i = 0; i < resenias.getLength(); i++) {
            ReseniaPelicula r = resenias.get(i);
            if (r.getId().equals(id)) {
                r.setResenia(contenido);
                r.setPuntuacion(puntuacion);
                r.setFechaResenia(new Date());
                
                dao.setObj(r);
                if (!dao.update(i)) {
                    throw new RuntimeException("Error al actualizar la reseña");
                }
                return r;
            }
        }
        throw new RuntimeException("Reseña no encontrada con ID: " + id);
    }

    public boolean eliminarResenia(Integer id, String usuarioActual) {
        if (!usuarioPuedeEliminar(id, usuarioActual)) {
            throw new SecurityException("No tienes permiso para eliminar esta reseña");
        }
        
        try {
            return dao.delete(id);
        } catch (Exception e) {
            throw new RuntimeException("Error al eliminar la reseña: " + e.getMessage());
        }
    }

    public LinkedList<ReseniaPelicula> obtenerReseniasDePelicula(Integer idPelicula) {
        if (idPelicula == null || idPelicula <= 0) {
            throw new IllegalArgumentException("ID de película inválido");
        }
        return dao.getReseniasPorPelicula(idPelicula);
    }

    public float obtenerPuntuacionPromedio(Integer idPelicula) {
        if (idPelicula == null || idPelicula <= 0) {
            throw new IllegalArgumentException("ID de película inválido");
        }
        return dao.getPuntuacionPromedio(idPelicula);
    }

    public boolean usuarioPuedeEliminar(Integer idResenia, String usuarioActual) {
        if (usuarioActual == null || usuarioActual.trim().isEmpty()) {
            return false;
        }
        
        LinkedList<ReseniaPelicula> resenias = dao.getLista_resenias();
        for (int i = 0; i < resenias.getLength(); i++) {
            ReseniaPelicula r = resenias.get(i);
            if (r.getId().equals(idResenia)) {
                return usuarioActual.equals(r.getAutor());
            }
        }
        return false;
    }

    private void validarDatosResenia(Integer idPelicula, String contenido, float puntuacion) {
        if (idPelicula == null || idPelicula <= 0) {
            throw new IllegalArgumentException("Se requiere un ID de película válido");
        }
        if (contenido == null || contenido.trim().isEmpty()) {
            throw new IllegalArgumentException("El contenido de la reseña no puede estar vacío");
        }
        if (puntuacion < 1 || puntuacion > 5) {
            throw new IllegalArgumentException("La puntuación debe estar entre 1 y 5");
        }
    }
}