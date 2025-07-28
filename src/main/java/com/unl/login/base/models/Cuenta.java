package com.unl.login.base.models;

import com.unl.login.base.models.enums.Estado_cuenta;

public class Cuenta {
    private Integer id;
    private String correo;
    private String contrasenia;
    private Integer id_persona;
    private Boolean estado;



    public Integer getId() {
        return id;
    }

    public void setId(Integer id_cuenta) {
        this.id = id_cuenta;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Integer getId_persona() {
        return id_persona;
    }

    public void setId_persona(Integer id_persona) {
        this.id_persona = id_persona;
    }

}
