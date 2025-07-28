package com.unl.login.base.models;

public class RepartoPelicula {
    private int idActor;
    private int idPelicula;
    private String papelActor;

    public int getIdActor() {
        return this.idActor;
    }

    public void setIdActor(int idActor) {
        this.idActor = idActor;
    }

    public int getIdPelicula() {
        return this.idPelicula;
    }

    public void setIdPelicula(int idPelicula) {
        this.idPelicula = idPelicula;
    }

    public String getPapelActor() {
        return this.papelActor;
    }

    public void setPapelActor(String papelActor) {
        this.papelActor = papelActor;
    }

}
