package com.unl.login.base.controller;
import java.util.Base64;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.JwsAlgorithms;



@EnableWebSecurity //HABILITA LA SEGURIDAD DE SPRING SECURITY EN MI PROYECTO
@Configuration // MARCA LA CLASE COMO DE CONFIGURACIÓN

public class SecurityConfiguration extends VaadinWebSecurity{

    public static final String LOGIN_URL = "/";

    @Value("${jwt.auth.secret}")
    private String authSecret;

    @Bean
    // CODIFICACION Y VERFICACION DE CONTRASEÑAS
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        //REDIRECCIONA AL LOGIN A USUARIOS NO AUTENTICADOS O AL CERRRAR SESION
        setLoginView(http, "/login","/");
        //CONFIGURACION DE LA APLICACION, JWT, TOKENS, REQUEST
        setStatelessAuthentication(http,
                new SecretKeySpec(Base64.getDecoder().decode(authSecret),
                        JwsAlgorithms.HS256),
                "com.unl.login");
        

    }

    @Override
    //CONFIGURA LAS RUTAS QUE NO NECESITAN AUTENTICACION O ESTAR PROTEGIDAS
    protected void configure(WebSecurity web) throws Exception {// Este se encarga de sacar los archivos o datos de una carpeta en especifico
        web.ignoring().requestMatchers(
                VaadinWebSecurity.getDefaultWebSecurityIgnoreMatcher())
                .requestMatchers(antMatchers("static/**"));
        super.configure(web);

    }


}
