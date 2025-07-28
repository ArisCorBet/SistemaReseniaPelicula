package com.unl.login.base.models;

public class Actor {
    private Integer idActor;
    private String nombre;
    private int anioCarrera;

    public Integer getIdActor() {
        return this.idActor;
    }

    public void setIdActor(Integer idActor) {
        this.idActor = idActor;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getAnioCarrera() {
        return this.anioCarrera;
    }

    public void setAnioCarrera(int anioCarrera) {
        this.anioCarrera = anioCarrera;
    }
}
