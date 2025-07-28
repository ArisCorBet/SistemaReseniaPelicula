package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoResena;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Resena;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.HashMap;

@Endpoint
@AnonymousAllowed
public class ResenaService {
    private DaoResena dao;

    public ResenaService() {
        dao = new DaoResena();
    }


    public List<Resena> listarPorPelicula(Integer idPelicula) {
        return Arrays.asList(dao.getByPeliculaId(idPelicula).toArray());
    }

    public List<Resena> listarPorUsuario(Integer idUsuario) {
        return Arrays.asList(dao.getByUsuarioId(idUsuario).toArray());
    }

    public Double obtenerPromedioPelicula(Integer idPelicula) {
        return dao.getPromedioCalificacion(idPelicula);
    }


    // Métodos adicionales para ordenar y buscar
}