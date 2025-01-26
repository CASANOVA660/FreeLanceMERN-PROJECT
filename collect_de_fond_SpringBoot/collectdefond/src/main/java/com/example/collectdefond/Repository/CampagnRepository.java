package com.example.collectdefond.Repository;

import com.example.collectdefond.Models.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CampagnRepository extends JpaRepository<Campaign, Long> {
}
