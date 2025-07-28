package com.unl.login.base.controller.dao.dao_models;

import com.google.gson.Gson;
import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.controller.data_struct.list.LinkedList;
import com.unl.login.base.models.ReseniaPelicula;

import java.io.File;

public class DaoReseniaPelicula extends AdapterDao<ReseniaPelicula> {
    private ReseniaPelicula obj;
    private LinkedList<ReseniaPelicula> lista_resenias;
    private String base_path = "data/";

    public DaoReseniaPelicula() {
        super(ReseniaPelicula.class);
        ensureSharedFolderExists();
    }

    private void ensureSharedFolderExists() {
        File folder = new File(base_path);
        if (!folder.exists()) {
            folder.mkdirs();
        }
    }

    public ReseniaPelicula getObj() {
        if (obj == null) {
            this.obj = new ReseniaPelicula();
        } 
        return this.obj;
    }

    public void setObj(ReseniaPelicula obj) {
        this.obj = obj;
    }

    public Boolean save() {
        try {
            obj.setId(listAll().getLength() + 1);
            this.persist(obj);
            return true;
        } catch (Exception e) {
            System.err.println("Error al guardar Reseña: " + e.getMessage());
            return false;
        }
    }

    public Boolean update(Integer pos) {
        try {
            this.update(obj, pos);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar Reseña: " + e.getMessage());
            return false;
        }
    }

    public Boolean delete(int id) throws Exception {
        try {
            LinkedList<ReseniaPelicula> resenias = getLista_resenias();
            boolean deleted = false;
            for (int i = 0; i < resenias.getLength(); i++) {
                if (resenias.get(i).getId() == id) {
                    resenias.delete(i);
                    deleted = true;
                    break;
                }
            }
            if (deleted) {
                String json = new Gson().toJson(resenias.toArray());
                saveFile(json);
                this.lista_resenias = listAll();
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new Exception("No se pudo eliminar la reseña: " + e.getMessage());
        }
    }

    public LinkedList<ReseniaPelicula> getLista_resenias() {
        if (lista_resenias == null) {
            lista_resenias = listAll();
        }
        return lista_resenias != null ? lista_resenias : new LinkedList<ReseniaPelicula>();
    }

    public LinkedList<ReseniaPelicula> getReseniasPorPelicula(int idPelicula) {
        LinkedList<ReseniaPelicula> reseniasPelicula = new LinkedList<>();
        LinkedList<ReseniaPelicula> todas = getLista_resenias();
        
        for (int i = 0; i < todas.getLength(); i++) {
            ReseniaPelicula r = todas.get(i);
            if (r.getIdPelicula() != null && r.getIdPelicula() == idPelicula) {
                reseniasPelicula.add(r);
            }
        }
        return reseniasPelicula;
    }

    public float getPuntuacionPromedio(int idPelicula) {
        LinkedList<ReseniaPelicula> resenias = getReseniasPorPelicula(idPelicula);
        if (resenias.getLength() == 0) return 0;
        
        float suma = 0;
        for (int i = 0; i < resenias.getLength(); i++) {
            suma += resenias.get(i).getPuntuacion();
        }
        return suma / resenias.getLength();
    }
}