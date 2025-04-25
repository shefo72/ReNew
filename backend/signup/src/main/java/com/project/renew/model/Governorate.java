package com.project.renew.model;


import jakarta.persistence.*;


//includes the governorate entities
@Entity
@Table(name = "Governorates")
public class Governorate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "governorate_id")
    private Integer id;

    @Column(name = "governorate_name", unique = true)
    private String name;

    public Governorate(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public Governorate() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}