package fr.app.pmt.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.app.pmt.dao.UserRepository;
import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.Users;
import fr.app.pmt.services.UserService;

@Service

public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<Users> finAll() {
		List<Users> users =new ArrayList<Users>();
		userRepository.findAll().forEach(users::add);
		
		return users;	

	}


	@Override
	public Users findById(int id) {
		
		Optional<Users> users = userRepository.findById(id);
		if(users.isPresent()) {
			return users.get();
			
		}
		throw new EntityDontExistExeption();
	}


	@Override
	public int created(Users users) {
		
		return userRepository.save(users).getId();
	}


	@Override
	public void update(int id, Users users) {
		userRepository.save(users);
		
	}


	@Override
	public void updatePartial(Users userExistant, Users newUsers) {
		if (newUsers.getNom()!=null) {
			userExistant.setNom(newUsers.getNom());
		}
		if (newUsers.getEmail()!=null) {
			userExistant.setEmail(newUsers.getEmail());
		}
		if (newUsers.getRole()!=null) {
			userExistant.setRole(newUsers.getRole());
		}
		if (newUsers.getPassword()!=null) {
			userExistant.setPassword(newUsers.getPassword());
		}
		if (newUsers.getRepassword()!=null) {
			userExistant.setRepassword(newUsers.getRepassword());
		}
		userRepository.save(userExistant);
	}


	@Override
	public void delete(int id) {
		userRepository.deleteById(id);
		
	}
	
	
	
}
