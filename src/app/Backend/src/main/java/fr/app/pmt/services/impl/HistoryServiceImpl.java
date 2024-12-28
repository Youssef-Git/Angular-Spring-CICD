package fr.app.pmt.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.app.pmt.dao.HistoryRepository;
import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.History;
import fr.app.pmt.services.HistoryService;
import jakarta.persistence.PreRemove;
import jakarta.persistence.PreUpdate;


@Service
public class HistoryServiceImpl implements HistoryService{
	
	@Autowired
	private HistoryRepository historyRepository;
	
	@Override
	public List<History> findAll() {
		
		List<History> histories = new ArrayList<History>();
		
			historyRepository.findAll().forEach(histories::add);
			
			return histories;

	}
	@Override
	public History findById(int id ) {
		
		Optional<History> history = historyRepository.findById(id);
		if(history.isPresent()) {
			return history.get();
		}
		throw new EntityDontExistExeption();
	}
	@Override
	@PreUpdate
	public int create(History history) {
		
		return historyRepository.save(history).getId();
	}
	@Override
	@PreRemove
	public void delete(int id) {
		historyRepository.deleteById(id);
	}
	

}
