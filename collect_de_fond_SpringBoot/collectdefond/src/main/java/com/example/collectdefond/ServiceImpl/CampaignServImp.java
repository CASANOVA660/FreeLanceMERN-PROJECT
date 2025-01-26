package com.example.collectdefond.ServiceImpl;

import com.example.collectdefond.Models.Association;
import com.example.collectdefond.Models.Campaign;
import com.example.collectdefond.Repository.AssociationRepository;
import com.example.collectdefond.Repository.CampagnRepository;
import com.example.collectdefond.Service.CampaignServ;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CampaignServImp implements CampaignServ {

    @Autowired
    private CampagnRepository Repo;

    @Override
    public long getTotalCampaigns() {
        return Repo.count();
    }

    @Autowired
    private AssociationRepository associationRepo;

    @Override
    public Campaign createCampaign(Campaign campaign) {
        try {
            // Récupérer l'ID de l'association depuis la requête ou utiliser 2 comme valeur par défaut
            Long associationId = campaign.getAssociation() != null && campaign.getAssociation().getId() != null
                    ? campaign.getAssociation().getId()
                    : 2L;  // Changé à 2 comme ID par défaut

            // Vérifier si l'association existe
            Association association = associationRepo.findById(associationId)
                    .orElseThrow(() -> new RuntimeException("Association non trouvée. Veuillez vérifier l'ID de l'association."));

            campaign.setAssociation(association);

            return Repo.save(campaign);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la création de la campagne: " + e.getMessage());
        }
    }

    @Override
    public List<Campaign> getAllCampaigns() {
        return Repo.findAll();
    }

    @Override
    public Optional<Campaign> getCampaignById(String id) {
        return Repo.findById(Long.valueOf(id));
    }

    @Override
    public Campaign updateCampaign(String id, Campaign campaign) {
        Campaign existingCampaign = Repo.findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("Campaign not found with id: " + id));

        // Conserver l'association existante
        Association existingAssociation = existingCampaign.getAssociation();

        // Mettre à jour les champs de la campagne
        existingCampaign.setName(campaign.getName());
        existingCampaign.setDescription(campaign.getDescription());
        existingCampaign.setTargetAmount(campaign.getTargetAmount());
        existingCampaign.setCurrentAmount(campaign.getCurrentAmount());
        existingCampaign.setStartDate(campaign.getStartDate());
        existingCampaign.setEndDate(campaign.getEndDate());
        existingCampaign.setBannerImage(campaign.getBannerImage());
        existingCampaign.setStatus(campaign.getStatus());

        // Conserver l'association existante
        existingCampaign.setAssociation(existingAssociation);

        return Repo.save(existingCampaign);
    }

    @Override
    public void deleteCampaign(String id) {
        if (Repo.existsById(Long.valueOf(id))) {
            Repo.deleteById(Long.valueOf(id));
        }
    }
}
