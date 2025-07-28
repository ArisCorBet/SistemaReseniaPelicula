package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoDirector;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Actor;
import com.unl.login.base.models.Director;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.Endpoint;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class DirectorService {
    private DaoDirector da;


    public DirectorService() {
        da = new DaoDirector();
    }


    public void createDirector(@NotEmpty String nombre, int anioCarrera) throws Exception {
        if(nombre.trim().length()> 0 && anioCarrera > 0){
            da.getObj().setNombre(nombre);
            da.getObj().setAniosCarrera(anioCarrera);
            if(!da.save())
                throw new Exception("No se pudo guardar el Director");
        }

    }

    public void updateDirector(Integer idDirector,@NotEmpty String nombre, int anioCarrera) throws Exception {
        if(nombre.trim().length()> 0 && anioCarrera > 0){
            da.getObj().setNombre(nombre);
            da.getObj().setAniosCarrera(anioCarrera);
            if(!da.update(idDirector -1))
                throw new Exception("No se pudo editar el Director");
        }

    }

    public Boolean delete(Integer id) throws Exception {
        return da.delete(id);
    }

    public LinkedList<Director> list() {
        return da.getLista_director();
    }

    public List<HashMap<String, String>> order(String attribute, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = da.orderQuickDirector(type, attribute);
        return Arrays.asList(lista.toArray());
    }

    public List<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = da.search(attribute, text, type);
        return Arrays.asList(lista.toArray());
    }
}