package com.example.collectdefond.Service;

import com.example.collectdefond.Models.Association;
import java.util.List;
import java.util.Optional;

public interface AssociationServ {
    Association createAssociation(Association association);
    List<Association> getAllAssociations();
    Optional<Association> getAssociationById(String id);
    Association updateAssociation(String id, Association association);
    void deleteAssociation(String id);
    long getTotalAssociations();

}
