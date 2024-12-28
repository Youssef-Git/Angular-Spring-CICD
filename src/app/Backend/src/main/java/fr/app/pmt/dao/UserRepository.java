package fr.app.pmt.dao;

import org.springframework.data.repository.CrudRepository;
import fr.app.pmt.models.Users;


public interface UserRepository extends CrudRepository<Users, Integer> {
	
}
