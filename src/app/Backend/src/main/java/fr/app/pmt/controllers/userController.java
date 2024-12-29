package fr.app.pmt.controllers;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.Users;
import fr.app.pmt.services.UserService;

@RestController
@CrossOrigin(origins="*")

public class userController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/utilisateur")
	public List<Users> findAll(){
		return userService.finAll();
	}
	
	@GetMapping("/utilisateur/{id}")
	public Users findById(@PathVariable("id") int id){
		
		Users users = userService.findById(id);
		
		if(users==null) {
			
		}return users;
	}
	
	@PostMapping("/utilisateur")
	@ResponseStatus(code=HttpStatus.CREATED)
	public int create(@RequestBody Users users) {
		
		return userService.created(users);	
	}
	@PutMapping("/utilisateur/{id}")
	@ResponseStatus(code=HttpStatus.OK)
	public void update(@PathVariable int id, @RequestBody Users users) {
		
		if (userService.findById(id)==null) {
		      throw new EntityDontExistExeption();
		}
		userService.update(id, users);
	}
	@PatchMapping("/utilisateur/{id}")
	@ResponseStatus(code=HttpStatus.OK)
	public void updatePartial(@PathVariable int id, @RequestBody Users newUsers) {
		Users userExistant= userService.findById(id);
		if (userExistant==null) {
		    throw new EntityDontExistExeption();
		    }
		
		userService.updatePartial(userExistant, newUsers);
	}
	
	  @DeleteMapping("/utilisateur/{id}")
	  @ResponseStatus(code = HttpStatus.OK)
	  public void delete(@PathVariable int id) {
	    if (userService.findById(id) == null) {
	      throw new EntityDontExistExeption();
	    }
	    userService.delete(id);
	  }
	  
}
