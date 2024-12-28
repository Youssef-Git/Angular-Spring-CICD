package fr.app.pmt.dao;

import org.springframework.data.repository.CrudRepository;

import fr.app.pmt.models.History;


public interface HistoryRepository extends CrudRepository<History, Integer>{
	
}