package fr.app.pmt.services;

import java.util.List;

import fr.app.pmt.models.Users;

public interface UserService {
	
	public List<Users> finAll();

	public Users findById(int id);

	public int created(Users users);

	public void update(int id, Users users);

	public void updatePartial(Users userExistant, Users newUsers);

	public void delete(int id);

}
