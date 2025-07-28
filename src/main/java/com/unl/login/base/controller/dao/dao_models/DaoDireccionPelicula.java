package com.unl.login.base.controller.dao.dao_models;

import com.unl.login.base.controller.dao.AdapterDao;
import com.unl.login.base.models.DireccionPelicula;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class DaoDireccionPelicula extends AdapterDao<DireccionPelicula> {
    private DireccionPelicula obj;

    public DaoDireccionPelicula() {
        super(DireccionPelicula.class);
        ensureFolder();
    }

    private void ensureFolder() {
        File folder = new File(base_path);
        if (!folder.exists()) {
            folder.mkdirs();
        }
    }

    public DireccionPelicula getObj() {
        if (obj == null) {
            obj = new DireccionPelicula();
        }
        return obj;
    }

    public void setObj(DireccionPelicula obj) {
        this.obj = obj;
    }

    public boolean save() {
        try {
            List<DireccionPelicula> lista = getListaDireccionPeliculas();
            int newId = 1;
            if (!lista.isEmpty()) {
                newId = lista.stream().mapToInt(DireccionPelicula::getIdRelacion).max().getAsInt() + 1;
            }
            obj.setIdRelacion(newId);
            persist(obj);
            return true;
        } catch (Exception e) {
            System.err.println("Error al guardar DirecciónPelicula: " + e.getMessage());
            return false;
        }
    }

    public boolean updatePorId(int idRelacion) {
        try {
            int pos = obtenerPosicionPorId(idRelacion);
            if (pos >= 0) {
                update(obj, pos);
                return true;
            } else {
                System.err.println("No se encontró relación con ID: " + idRelacion);
                return false;
            }
        } catch (Exception e) {
            System.err.println("Error al actualizar DirecciónPelicula: " + e.getMessage());
            return false;
        }
    }

    public void delete(DireccionPelicula direccionPelicula) {
        try {
            List<DireccionPelicula> lista = getListaDireccionPeliculas();
            lista.removeIf(dp -> dp.getIdRelacion() == direccionPelicula.getIdRelacion());
            for (DireccionPelicula dp : lista) {
                persist(dp); // guardamos nuevamente uno por uno (simple pero funcional con tu AdapterDao)
            }
        } catch (Exception e) {
            System.err.println("Error al eliminar DirecciónPelicula: " + e.getMessage());
        }
    }

    public List<DireccionPelicula> getListaDireccionPeliculas() {
        List<DireccionPelicula> lista = new ArrayList<>();
        var linkedList = listAll();
        for (int i = 0; i < linkedList.getLength(); i++) {
            lista.add(linkedList.get(i));
        }
        return lista;
    }

    private int obtenerPosicionPorId(int idRelacion) {
        var lista = listAll();
        for (int i = 0; i < lista.getLength(); i++) {
            if (lista.get(i).getIdRelacion() == idRelacion) {
                return i;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        DaoDireccionPelicula dao = new DaoDireccionPelicula();

        dao.setObj(new DireccionPelicula());
        dao.getObj().setIdDirector(1);
        dao.getObj().setIdPelicula(101);
        System.out.println(dao.save() ? "Guardado exitosamente" : "Error al guardar");

        dao.setObj(new DireccionPelicula());
        dao.getObj().setIdDirector(2);
        dao.getObj().setIdPelicula(102);
        System.out.println(dao.save() ? "Guardado exitosamente" : "Error al guardar");
    }
}
