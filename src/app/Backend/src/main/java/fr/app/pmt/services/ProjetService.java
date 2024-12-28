package fr.app.pmt.services;

import java.util.List;

import fr.app.pmt.models.Projets;

public interface ProjetService {
	
	public List<Projets> findAll();

	public Projets findById(int id);

	public int create(Projets projets);

	public void update(int id, Projets projets);

	void updatePartial(int id, Projets projetsExistants, Projets newProjets);

	public void delete(int id);




}
