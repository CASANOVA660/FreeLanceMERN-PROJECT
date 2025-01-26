package com.example.collectdefond.Controllers;

import com.example.collectdefond.Models.Campaign;
import com.example.collectdefond.Models.Donation;
import com.example.collectdefond.Models.Donation.PaymentMethod;
import com.example.collectdefond.ServiceImpl.DonationServImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonationController {

    @Autowired
    private DonationServImp donationServ;

    @GetMapping("/total")
    public ResponseEntity<Map<String, Object>> getTotalDonations() {
        try {
            long totalDonations = donationServ.getTotalDonations();
            Map<String, Object> response = new HashMap<>();
            response.put("total", totalDonations);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la récupération du total des donations");
            errorResponse.put("message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/donate")
    public ResponseEntity<?> donate(@RequestBody Map<String, Object> payload) {
        try {
            // Validation des champs requis
            if (!payload.containsKey("donorName") || !payload.containsKey("donorEmail") ||
                    !payload.containsKey("amount") || !payload.containsKey("paymentMethod") ||
                    !payload.containsKey("campaign_id")) {
                return new ResponseEntity<>("Tous les champs requis doivent être remplis",
                        HttpStatus.BAD_REQUEST);
            }

            Donation donation = new Donation();

            // Information du donateur
            donation.setDonorName((String) payload.get("donorName"));
            donation.setDonorEmail((String) payload.get("donorEmail"));

            // Montant
            try {
                double amount = Double.parseDouble(payload.get("amount").toString());
                if (amount <= 0) {
                    return new ResponseEntity<>("Le montant doit être supérieur à 0",
                            HttpStatus.BAD_REQUEST);
                }
                donation.setAmount(amount);
            } catch (NumberFormatException e) {
                return new ResponseEntity<>("Montant invalide", HttpStatus.BAD_REQUEST);
            }
            try {
                PaymentMethod paymentMethod = PaymentMethod.valueOf(
                        ((String) payload.get("paymentMethod")).toUpperCase());
                donation.setPaymentMethod(paymentMethod);
                if (payload.containsKey("cardNumber")) {
                    donation.setCardNumber((String) payload.get("cardNumber"));
                }
            } catch (IllegalArgumentException e) {
                return new ResponseEntity<>("Méthode de paiement invalide",
                        HttpStatus.BAD_REQUEST);
            }

            // Campagne
            try {
                Campaign campaign = new Campaign();
                campaign.setId(Long.valueOf(payload.get("campaign_id").toString()));
                donation.setCampaign(campaign);
            } catch (NumberFormatException e) {
                return new ResponseEntity<>("ID de campagne invalide",
                        HttpStatus.BAD_REQUEST);
            }
            donation.setStatus(Donation.Status.valueOf("PENDING"));
            Donation savedDonation = donationServ.donate(donation);
            return new ResponseEntity<>(savedDonation, HttpStatus.CREATED);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la création de la donation");
            errorResponse.put("message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/by-email")
    public ResponseEntity<?> getDonationsByEmail(@RequestParam String email) {
        try {
            if (email == null || email.trim().isEmpty()) {
                return new ResponseEntity<>("L'email ne peut pas être vide",
                        HttpStatus.BAD_REQUEST);
            }

            List<Donation> donations = donationServ.getDonationsByEmail(email);

            if (donations.isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("message", "Aucune donation trouvée pour cet email");
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            return ResponseEntity.ok(donations);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Erreur lors de la récupération des donations");
            errorResponse.put("message", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}