package com.mizu20040814.kakeiboapi.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="expenses")
@Getter
@Setter
@NoArgsConstructor

public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer amount;

    @Column(nullable = false,length = 50)
    private String category;

    @Column(length = 200)
    private String memo;

}
