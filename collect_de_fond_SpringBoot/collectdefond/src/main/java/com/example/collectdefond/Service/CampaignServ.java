package com.example.collectdefond.Service;

import com.example.collectdefond.Models.Campaign;
import java.util.List;
import java.util.Optional;

public interface CampaignServ {
    long getTotalCampaigns();
    Campaign createCampaign(Campaign campaign);
    List<Campaign> getAllCampaigns();
    Optional<Campaign> getCampaignById(String id);
    Campaign updateCampaign(String id, Campaign campaign);
    void deleteCampaign(String id);
}
