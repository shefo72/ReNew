package com.project.renew.DTO;



// login data transfer object
public class LogInDto {
    private String email, password;

    public LogInDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LogInDto() {
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

    @Override
    public String toString() {
        return "LogInDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
