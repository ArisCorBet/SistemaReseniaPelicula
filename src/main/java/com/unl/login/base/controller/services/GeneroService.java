package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoGenero;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.Actor;
import com.unl.login.base.models.Director;
import com.unl.login.base.models.Genero;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@BrowserCallable
@AnonymousAllowed

public class GeneroService {
    private DaoGenero dg;

    public GeneroService() {
        this.dg = new DaoGenero();
    }

    public void createGenero(@NotEmpty String Nombre) throws Exception {
        if (Nombre.trim().length() > 0 ) {
            dg.getObj().setNombre(Nombre);

            if (!dg.save())
                throw new Exception("No se pudo guardar los datos de la Genero");
        }
    }

    public void updateGenero(Integer idGenero,@NotEmpty String Nombre ) throws Exception {
        if (Nombre.trim().length() > 0 ) {
            dg.getObj().setIdGenero(idGenero);
            dg.getObj().setNombre(Nombre);   
            if (!dg.update(idGenero -1))
                throw new Exception("No se pudo guardar los datos de la Genero");
        }
    }

    public Boolean delete(Integer id) throws Exception {
        return dg.delete(id);
    }

    public LinkedList<Genero> list() {
        return dg.getLista_generos();
    }

    public List<HashMap<String, String>> order(String attribute, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = dg.orderQuickGenero(type, attribute);
        return Arrays.asList(lista.toArray());
    }

    public List<HashMap<String, String>> search(String attribute, String text, Integer type) throws Exception {
        LinkedList<HashMap<String, String>> lista = dg.search(attribute, text, type);
        return Arrays.asList(lista.toArray());
    }

    public List<HashMap> listAll() throws Exception{
        return Arrays.asList(dg.all().toArray());
    }
    
}
