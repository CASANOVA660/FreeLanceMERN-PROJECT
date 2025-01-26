package com.example.collectdefond.Service;

import com.example.collectdefond.Models.Campaign;
import com.example.collectdefond.Models.Donation;
import java.util.List;

public interface DonationServ {

    long getTotalDonations();
    Donation donate(
            String donorName,
            String donorEmail,
            double amount,
            Campaign campaignId,
            Donation.PaymentMethod paymentMethod,
            String cardNumber
    );
    List<Donation> getDonationsByEmail(String email);
}
