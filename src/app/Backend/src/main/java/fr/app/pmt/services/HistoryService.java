package fr.app.pmt.services;

import java.util.List;

import fr.app.pmt.models.History;

public interface HistoryService {
	
	public List<History> findAll();

	public History findById(int id);

	public int create(History history);

	public void delete(int id);

}
