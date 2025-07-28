package com.unl.login.base.controller.dao.dao_models;

import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.models.GeneroPelicula;

public class DaoGeneroPelicula extends AdapterDao<GeneroPelicula> {
    private GeneroPelicula obj;

    public DaoGeneroPelicula() {
        super(GeneroPelicula.class);
        // TODO Auto-generated constructor stub
    }

    public GeneroPelicula getObj() {
        if (obj == null)
            this.obj = new GeneroPelicula();
        return obj;
    }

    public void setObj(GeneroPelicula obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setIdGeneroPelicula(listAll().getLength() + 1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            
            return false;
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            
            //TODO
            return false;
            // TODO: handle exception
        }
    }

    
    
}
