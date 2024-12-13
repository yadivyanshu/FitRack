package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Table(name = "venues")
@Data
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    @Size(min = 3, max = 20,message = "Name must be between 3 and 20 character")
    @NotBlank(message = "Name is mandatory field")
    private String name;

    @Column(nullable = false)
    @Size(min = 3, max = 20,message = "Location must be between 3 and 20 character")
    @NotBlank(message = "Location is mandatory field")
    private String location;

}