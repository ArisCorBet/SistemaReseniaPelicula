package com.unl.login.base.controller.services;

import com.unl.login.base.controller.dao.dao_models.DaoGenero;
import com.unl.login.base.controller.dao.dao_models.DaoGeneroPelicula;
import com.unl.login.base.controller.dao.dao_models.DaoPelicula;
import com.unl.login.base.models.Genero;
import com.unl.login.base.models.GeneroPelicula;
import com.unl.login.base.models.Pelicula;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.hilla.BrowserCallable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@BrowserCallable
@AnonymousAllowed

public class GeneroPeliculaService {
    private DaoGeneroPelicula dp;

    public GeneroPeliculaService() {
        this.dp = new DaoGeneroPelicula();
    }

    public void createGeneroPelicula( Integer idPelicula,  Integer idGenero) throws Exception {
        if (idPelicula > 0 && idGenero >0) {
            dp.getObj().setIdPelicula(idPelicula);
            dp.getObj().setIdGenero(idGenero);


            if (!dp.save())
                throw new Exception("No se pudo guardar los datos de la Genero");
        }
    }
    public void updateGeneroPelicula(Integer idGeneroPelicula, Integer idGenero,Integer idPelicula ) throws Exception {
        if (idGeneroPelicula !=null && idGeneroPelicula > 0 && idGenero > 0 && idPelicula > 0) {
            dp.setObj(dp.listAll().get(idGeneroPelicula-1));
            dp.getObj().setIdGenero(idGenero);
            dp.getObj().setIdPelicula(idPelicula); 
            if (!dp.update(idGeneroPelicula -1))
                throw new Exception("No se pudo guardar los datos de la Genero");
        }
    }





    public List<HashMap> listaGeneroCombo(){
        List<HashMap> lista = new ArrayList<>();
        DaoGenero dg = new DaoGenero();
        if(!dg.listAll().isEmpty()) {
            Genero [] arreglo = dg.listAll().toArray();
            for(int i = 0; i < arreglo.length; i++){
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getIdGenero().toString()); 
                aux.put("label", arreglo[i].getNombre());  
                lista.add(aux);    
            }
        }
        return lista;
    }



    public List<HashMap> listaPeliculaCombo(){
        List<HashMap> lista = new ArrayList<>();
        DaoPelicula dp = new DaoPelicula();
        if(!dp.listAll().isEmpty()) {
            Pelicula [] arreglo = dp.listAll().toArray();
            for(int i = 0; i < arreglo.length; i++){
                HashMap<String, String> aux = new HashMap<>();
                aux.put("value", arreglo[i].getId().toString()); 
                aux.put("label", arreglo[i].getTitulo());  
                lista.add(aux);    
            }
        }
        return lista;
    }


    public List<HashMap> listGeneroPelicula(){
        List<HashMap> lista = new ArrayList<>();
        if(!dp.listAll().isEmpty()) {
            GeneroPelicula [] arreglo = dp.listAll().toArray();
      
            for(int i = 0; i < arreglo.length; i++) {
                HashMap<String, String> aux = new HashMap<>();
                aux.put("idPeliculaGenero", String.valueOf(arreglo[i].getIdGeneroPelicula().toString()));
                aux.put("idGenero", String.valueOf(arreglo[i].getIdGenero().toString()));
                aux.put("idPelicula", String.valueOf(arreglo[i].getIdPelicula().toString()));
                lista.add(aux);
            }
        }
        return lista;
    
    }

    
}