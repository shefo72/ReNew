package com.project.renew.repo;

import com.project.renew.model.Governorate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// dealing with db (governorates table)
public interface GovernorateRepo extends JpaRepository<Governorate,Integer> {
    Optional<Governorate> findByName(String name);
}

