package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoDireccionPelicula;
import com.unl.login.base.models.DireccionPelicula;

import java.util.List;

public class DireccionPeliculaService {

    private DaoDireccionPelicula dao;

    public DireccionPeliculaService() {
        this.dao = new DaoDireccionPelicula();
    }

    public List<DireccionPelicula> listarTodas() {
        return dao.getListaDireccionPeliculas();
    }

    public boolean crearDireccion(DireccionPelicula direccion) {
        dao.setObj(direccion);
        return dao.save();
    }

    public boolean actualizarDireccion(int idRelacion, DireccionPelicula direccionActualizada) {
        dao.setObj(direccionActualizada);
        return dao.updatePorId(idRelacion);
    }

    public boolean eliminarDireccion(DireccionPelicula direccion) {
        try {
            dao.delete(direccion);
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar DirecciónPelicula: " + e.getMessage());
            return false;
        }
    }

    public DireccionPelicula obtenerPorId(int idRelacion) {
        try {
            List<DireccionPelicula> lista = dao.getListaDireccionPeliculas();
            return lista.stream()
                    .filter(d -> d.getIdRelacion() == idRelacion)
                    .findFirst()
                    .orElse(null);
        } catch (Exception e) {
            System.err.println("Error al obtener DirecciónPelicula por ID: " + e.getMessage());
            return null;
        }
    }
}
