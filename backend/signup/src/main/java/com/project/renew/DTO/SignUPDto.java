package com.project.renew.DTO;


// signUP data transfer object
public class SignUPDto {
    private String name, email, password, phone, governorate;

    public SignUPDto(String name, String email, String password, String phone, String governorate) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.governorate = governorate;
    }

    public SignUPDto() {
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

    public String getGovernorate() {
        return governorate;
    }

    public void setGovernorate(String governorate) {
        this.governorate = governorate;
    }

    @Override
    public String toString() {
        return "SignUPDto{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", governorate='" + governorate + '\'' +
                '}';
    }
}