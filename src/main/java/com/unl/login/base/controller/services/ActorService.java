package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoActor;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Actor;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import com.vaadin.hilla.Endpoint;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@BrowserCallable
@AnonymousAllowed
public class ActorService {
    private DaoActor da;

    public ActorService() {
        da = new DaoActor();
    }

    public void createActor(@NotEmpty String nombre, int anioCarrera) throws Exception {
        if(nombre.trim().length()> 0 && anioCarrera > 0){
            da.getObj().setNombre(nombre);
            da.getObj().setAnioCarrera(anioCarrera);
            if(!da.save())
                throw new Exception("No se pudo guardar el Actor");
        }

    }

    public void updateActor(Integer idActor,@NotEmpty String nombre, int anioCarrera) throws Exception {
        if(nombre.trim().length()> 0 && anioCarrera > 0){
            da.getObj().setNombre(nombre);
            da.getObj().setAnioCarrera(anioCarrera);
            if(!da.update(idActor -1))
                throw new Exception("No se pudo guardar el Actor");
        }

    }

    public Boolean delete(Integer id) throws Exception {
        return da.delete(id);
    }

    public LinkedList<Actor> list() {
        return da.getLista_actor();
    }

    public List<HashMap<String, String>> order(String attribute, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = da.orderQuickActor(type, attribute);
        return Arrays.asList(lista.toArray());
    }

    public List<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = da.search(attribute, text, type);
        return Arrays.asList(lista.toArray());
    }


    public List<HashMap> listAll() throws Exception{
        return Arrays.asList(da.all().toArray());
    }

}