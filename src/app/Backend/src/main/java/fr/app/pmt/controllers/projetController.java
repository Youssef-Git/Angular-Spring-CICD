package fr.app.pmt.controllers;

import fr.app.pmt.exeption.EntityDontExistExeption;
import fr.app.pmt.models.Projets;
import fr.app.pmt.services.ProjetService;
import jakarta.persistence.EntityExistsException;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class projetController {

  @Autowired
  private ProjetService projetService;

  @GetMapping("/projet")
  public List<Projets> findAll() {
    return projetService.findAll();
  }

  @GetMapping("/projet/{id}")
  public Projets findById(@PathVariable("id") int id) {
    Projets projets = projetService.findById(id);

    if (projets == null) {}
    return projets;
  }

  @PostMapping("/projet")
  @ResponseStatus(code = HttpStatus.CREATED)
  public int create(@RequestBody Projets projets) {
    return projetService.create(projets);
  }

  @PutMapping("/projet/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public void update(@PathVariable int id, @RequestBody Projets projets) {
    if (projetService.findById(id) == null) {
      throw new EntityExistsException("Cette entreprise n'existe pas");
    }
    projetService.update(id, projets);
  }

  @PatchMapping("/projet/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public void updatePartial(
    @PathVariable int id,
    @RequestBody Projets newProjets
  ) {
    Projets projetsExistants = projetService.findById(id);

    if (projetsExistants == null) {
      throw new EntityDontExistExeption();
    }
    

    projetService.updatePartial(id, projetsExistants, newProjets);
  }

  @DeleteMapping("/projet/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public void delete(@PathVariable int id) {
    if (projetService.findById(id) == null) {
      throw new EntityDontExistExeption();
    }
    projetService.delete(id);
  }
}
