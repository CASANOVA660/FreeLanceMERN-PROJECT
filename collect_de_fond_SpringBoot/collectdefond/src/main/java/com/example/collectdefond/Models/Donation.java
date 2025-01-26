package com.example.collectdefond.Models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "donations")
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String donorName;

    @Column(nullable = false)
    private String donorEmail;

    @Column(nullable = false)
    private Double amount;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id", nullable = false)
    public Campaign campaign;

    @Column(nullable = false, updatable = false)
    private LocalDateTime donationDate;

    @Column
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column
    private String receiptUrl;

    @Column
    private String cardNumber;

    @PrePersist
    protected void onCreate() {
        this.donationDate = LocalDateTime.now();
        if (this.status == null) {
            this.status = Status.PENDING;
        }
    }
    public enum PaymentMethod {
        CREDIT_CARD,
        PAYPAL
    }

    public enum Status {
        COMPLETED,
        PENDING,
        FAILED
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Campaign getCampaign() {
        return campaign;
    }

    public void setCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public LocalDateTime getDonationDate() {
        return donationDate;
    }



    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getReceiptUrl() {
        return receiptUrl;
    }

    public void setReceiptUrl(String receiptUrl) {
        this.receiptUrl = receiptUrl;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public Donation() {
        this.id = id;
        this.donorName = donorName;
        this.donorEmail = donorEmail;
        this.amount = amount;
        this.campaign = campaign;
        this.donationDate = donationDate;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.receiptUrl = receiptUrl;
        this.cardNumber = cardNumber;
    }
}
