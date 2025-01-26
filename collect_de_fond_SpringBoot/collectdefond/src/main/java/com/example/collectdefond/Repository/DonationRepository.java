package com.example.collectdefond.Repository;

import com.example.collectdefond.Models.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByDonorEmail(String donorEmail);


}
