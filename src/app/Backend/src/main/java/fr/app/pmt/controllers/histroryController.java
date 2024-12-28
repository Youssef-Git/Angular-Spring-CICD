package fr.app.pmt.controllers;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.History;
import fr.app.pmt.services.HistoryService;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class histroryController {
	
	@Autowired
	private HistoryService historyService;
	
	@GetMapping("/historique")
	public List<History> findAll(){
		return historyService.findAll();
			
	}	
	@GetMapping("/historique/{id}")
	
	public History findById(@PathVariable("id") int id) {
		
		History history = historyService.findById(id);
		if(history==null) {
			
		}
		return history;
		
	}
	@PostMapping("/historique")
	@ResponseStatus(code=HttpStatus.CREATED)
	public int create (@RequestBody History history){
		history.setDateHistory(LocalDateTime.now());
		
		return historyService.create(history);
	}
	
	@PostMapping("/historique/log")
	@ResponseStatus(code=HttpStatus.CREATED)
	public void logEvent(@RequestParam String action) {
		
		History history = new History();
		history.setAction(action);
		history.setDateHistory(LocalDateTime.now());
		
		
	};
	
	
	@DeleteMapping("/historique/{id}")
	@ResponseStatus(code=HttpStatus.OK)
	public void delete(@PathVariable int id) {
		
		if(historyService.findById(id)==null) {
			
			throw new EntityDontExistExeption();
		}
		historyService.delete(id);
		
	}

	
}
