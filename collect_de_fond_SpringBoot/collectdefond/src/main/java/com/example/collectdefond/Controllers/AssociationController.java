package com.example.collectdefond.Controllers;

import com.example.collectdefond.Models.Association;
import com.example.collectdefond.ServiceImpl.AssociationServImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/associations")
public class AssociationController {

    @Autowired
    private AssociationServImp associationServ;

    @PostMapping("/create")
    public ResponseEntity<?> createAssociation(@RequestBody Association association) {
        try {
            // Validation des champs obligatoires
            if (association.getName() == null || association.getName().trim().isEmpty()) {
                return new ResponseEntity<>("Le nom est obligatoire", HttpStatus.BAD_REQUEST);
            }
            if (association.getEmail() == null || association.getEmail().trim().isEmpty()) {
                return new ResponseEntity<>("L'email est obligatoire", HttpStatus.BAD_REQUEST);
            }
            if (association.getDescription() == null || association.getDescription().trim().isEmpty()) {
                return new ResponseEntity<>("La description est obligatoire", HttpStatus.BAD_REQUEST);
            }

            Association createdAssociation = associationServ.createAssociation(association);
            return new ResponseEntity<>(createdAssociation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erreur lors de la création: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/total")
    public ResponseEntity<Long> getTotalCampaigns() {
        try {
            long totalCampaigns = associationServ.getTotalAssociations();
            return ResponseEntity.ok(totalCampaigns);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<Association>> getAllAssociations() {
        List<Association> associations = associationServ.getAllAssociations();
        return new ResponseEntity<>(associations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Association> getAssociationById(@PathVariable String id) {
        Optional<Association> association = associationServ.getAssociationById(id);
        return association.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Association> updateAssociation(@PathVariable String id, @RequestBody Association association) {
        Association updatedAssociation = associationServ.updateAssociation(id, association);
        if (updatedAssociation != null) {
            return new ResponseEntity<>(updatedAssociation, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssociation(@PathVariable String id) {
        try {
            associationServ.deleteAssociation(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
