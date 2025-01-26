package com.example.collectdefond.Controllers;

import com.example.collectdefond.Models.Association;
import com.example.collectdefond.Models.Campaign;
import com.example.collectdefond.ServiceImpl.CampaignServImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    @Autowired
    private CampaignServImp campaignServ;

    @PostMapping("/create")
    public ResponseEntity<?> createCampaign(@RequestBody Map<String, Object> payload) {
        try {
            Campaign campaign = new Campaign();

            // Gestion de l'association
            Association association = new Association();
            if (payload.containsKey("association_id")) {
                association.setId(Long.valueOf(payload.get("association_id").toString()));
            } else {
                association.setId(2L);
            }
            campaign.setAssociation(association);

            // Autres champs
            if (payload.containsKey("name")) campaign.setName((String) payload.get("name"));
            if (payload.containsKey("description")) campaign.setDescription((String) payload.get("description"));
            if (payload.containsKey("targetAmount"))
                campaign.setTargetAmount(Double.valueOf(payload.get("targetAmount").toString()));
            if (payload.containsKey("currentAmount"))
                campaign.setCurrentAmount(Double.valueOf(payload.get("currentAmount").toString()));
            if (payload.containsKey("startDate"))
                campaign.setStartDate(LocalDate.parse((String) payload.get("startDate")));
            if (payload.containsKey("endDate"))
                campaign.setEndDate(LocalDate.parse((String) payload.get("endDate")));
            if (payload.containsKey("bannerImage"))
                campaign.setBannerImage((String) payload.get("bannerImage"));

            Campaign createdCampaign = campaignServ.createCampaign(campaign);
            return new ResponseEntity<>(createdCampaign, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/")
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        List<Campaign> campaigns = campaignServ.getAllCampaigns();
        return new ResponseEntity<>(campaigns, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable String id) {
        Optional<Campaign> campaign = campaignServ.getCampaignById(id);
        return campaign.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalCampaigns() {
        try {
            long totalCampaigns = campaignServ.getTotalCampaigns();
            return ResponseEntity.ok(totalCampaigns);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(@PathVariable String id, @RequestBody Campaign campaign) {
        try {
            Campaign updatedCampaign = campaignServ.updateCampaign(id, campaign);
            return ResponseEntity.ok(updatedCampaign);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable String id) {
        try {
            campaignServ.deleteCampaign(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
