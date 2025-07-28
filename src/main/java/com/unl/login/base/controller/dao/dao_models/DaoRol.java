package com.unl.login.base.controller.dao.dao_models;

import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.models.Rol;

public class DaoRol extends AdapterDao<Rol> {
    private Rol obj;

    public DaoRol() {
        super(Rol.class);
        // TODO Auto-generated constructor stub
    }

    public Rol getObj() {
        if (obj == null)
            this.obj = new Rol();
        return this.obj;
    }

    public void setObj(Rol obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(listAll().getLength()+1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            //TODO
            return false;
            // TODO: handle exception
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

    public static void main (String[] args) {
        DaoRol daoRol = new DaoRol();
        daoRol.getObj().setId(daoRol.listAll().getLength()+1);
        daoRol.getObj().setNombre("admin");
        if(daoRol.save())
            System.out.println("GUARDADO");
        else
            System.out.println("NO GUARDADO");
        daoRol.getObj().setId(daoRol.listAll().getLength()+1);
        daoRol.getObj().setNombre("usuario");
        if(daoRol.save())
            System.out.println("GUARDADO");
        else
            System.out.println("NO GUARDADO");

    }

    

}
