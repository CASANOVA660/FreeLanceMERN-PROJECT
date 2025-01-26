package com.example.collectdefond.ServiceImpl;

import com.example.collectdefond.Models.Campaign;
import com.example.collectdefond.Models.Donation;
import com.example.collectdefond.Repository.DonationRepository;
import com.example.collectdefond.Service.DonationServ;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class DonationServImp implements DonationServ {
    @Autowired
    private DonationRepository Repo;
    @Override
    public long getTotalDonations() {
        return Repo.count();
    }

    @Override
    public Donation donate(String donorName, String donorEmail, double amount, Campaign campaignId, Donation.PaymentMethod paymentMethod, String cardNumber) {
        Donation newDonation = new Donation();
        newDonation.setDonorName(donorName);
        newDonation.setDonorEmail(donorEmail);
        newDonation.setAmount(amount);
        newDonation.setCampaign(campaignId);
        newDonation.setPaymentMethod(paymentMethod);
        newDonation.setCardNumber(cardNumber);


        return Repo.save(newDonation);
    }



    @Override
    public List<Donation> getDonationsByEmail(String email) {
        return Repo.findByDonorEmail(email);
    }

    public Donation donate(Donation donation) {
        return  Repo.save((donation));
    }
}
