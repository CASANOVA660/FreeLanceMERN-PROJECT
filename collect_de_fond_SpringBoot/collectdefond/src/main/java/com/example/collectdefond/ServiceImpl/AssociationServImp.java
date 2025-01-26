package com.example.collectdefond.ServiceImpl;

import com.example.collectdefond.Models.Association;
import com.example.collectdefond.Repository.AssociationRepository;
import com.example.collectdefond.Service.AssociationServ;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AssociationServImp implements AssociationServ {
    @Autowired
    private AssociationRepository Repo;
    @Override
    public long getTotalAssociations() {
        return Repo.count();
    }

    @Override
    public Association createAssociation(Association association) {
        try {
            // Vérification supplémentaire des champs obligatoires
            if (association.getName() == null || association.getEmail() == null ||
                    association.getDescription() == null) {
                throw new RuntimeException("Champs obligatoires manquants");
            }

            return Repo.save(association);
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la création de l'association: " + e.getMessage());
        }
    }

    @Override
    public List<Association> getAllAssociations() {
        return Repo.findAll();
    }

    @Override
    public Optional<Association> getAssociationById(String id) {
        return Repo.findById(Long.valueOf(id));
    }

    @Override
    public Association updateAssociation(String id, Association association) {
        if (Repo.existsById(Long.valueOf(id))) {
            association.setId(Long.valueOf(id));
            return Repo.save(association);
        }
        return association;
    }

    @Override
    public void deleteAssociation(String id) {
        if (Repo.existsById(Long.valueOf(id))) {
            Repo.deleteById(Long.valueOf(id));
        }
    }
}
