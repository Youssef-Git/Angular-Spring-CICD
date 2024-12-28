package fr.app.pmt.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.app.pmt.dao.ProjetRepository;
import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.Projets;
import fr.app.pmt.services.ProjetService;

@Service
public class ProjetServiceImpl implements ProjetService{
	
	@Autowired
	
	private ProjetRepository projetRepository;
	
	@Override
	public List<Projets> findAll() {
		
		List<Projets> projets = new ArrayList<Projets>();
		projetRepository.findAll().forEach(projets::add);		
	
		return projets;
	}

	@Override
	public Projets findById(int id) {
		
		Optional<Projets> projets = projetRepository.findById(id);
		
		if(projets.isPresent()) {
			return projets.get();
			
		}
		
		 throw new EntityDontExistExeption();
	}

	@Override
	public int create(Projets projets) {
		return projetRepository.save(projets).getId();
	}

	@Override
	public void update(int id, Projets projets) {
		projetRepository.save(projets);
	}

	@Override
	public void updatePartial(int id, Projets projetsExistants, Projets newProjets) {
	
		if(newProjets.getNom() !=null) {
			
			projetsExistants.setNom(newProjets.getNom());
			
		
	}
		if(newProjets.getObjectif() !=null) {
			
			projetsExistants.setObjectif(newProjets.getObjectif());
			}
		
		if(newProjets.getContext() !=null) {
		
		projetsExistants.setContext(newProjets.getContext());
		
		}
if(newProjets.getDescription() !=null) {
		
		projetsExistants.setDescription(newProjets.getDescription());
		}

if(newProjets.getStatut() !=null) {
	
	projetsExistants.setStatut(newProjets.getStatut());
	}


if(newProjets.getDateFin() !=null) {
	
	projetsExistants.setDateFin(newProjets.getDateFin());
	}


if(newProjets.getDateDebut() !=null) {
	
	projetsExistants.setDateDebut(newProjets.getDateDebut());
	}
	//Mise à jour de tous les champs du projet
	
		projetRepository.save(projetsExistants);
	}

	@Override
	public void delete(int id) {
		projetRepository.deleteById(id);
		
	}
	
}
