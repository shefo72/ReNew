package com.project.renew.model;

import jakarta.persistence.*;

//includes everything need to know about the user
@Entity
@Table(name = "Users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "governorate_id", nullable = false)
    private Governorate governorate;

    @Column(name = "user_name")
    private String name;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password", length = 60)
    private String password;

    @Column(name = "phone_number")
    private String phone;

    public User(Integer id, Governorate governorate, String name, String email, String password, String phone) {
        this.id = id;
        this.governorate = governorate;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    public User() {
    }
// getters/setters


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Governorate getGovernorate() {
        return governorate;
    }

    public void setGovernorate(Governorate governorate) {
        this.governorate = governorate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "User{" +
                 "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}



