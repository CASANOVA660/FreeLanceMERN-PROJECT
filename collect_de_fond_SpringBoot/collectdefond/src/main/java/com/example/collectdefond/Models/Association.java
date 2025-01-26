package com.example.collectdefond.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "associations")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "campaigns"})
public class Association {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String phone;

    @Column(nullable = true)
    private String website;

    @Column(nullable = true)
    private String address;

    @Column(nullable = true)
    private String logo;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    // Modification de la relation Campaign pour la rendre optionnelle
    @OneToMany(mappedBy = "association", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Campaign> campaigns;

    public Association() {
        // Initialisation de la liste mais elle peut être vide
        this.campaigns = new ArrayList<>();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters et Setters
    // ... autres getters et setters ...

    public List<Campaign> getCampaigns() {
        return campaigns != null ? campaigns : new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getWebsite() {
        return website;
    }

    public String getAddress() {
        return address;
    }

    public String getLogo() {
        return logo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setId(Long aLong) {
    }
}