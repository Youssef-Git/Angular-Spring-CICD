import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup, 
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../../services/app.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-adduserform',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './adduserform.component.html',
  styleUrl: './adduserform.component.css',
  providers: [AppService],
})
export class AdduserformComponent  implements OnInit{
  faCirclePlus = faCirclePlus;
  isAddUserOpen = false;
  userForm!: FormGroup;


  openAddUserForm() {
    this.isAddUserOpen = true;
  }

  closeAddUserForm() {
    this.isAddUserOpen = false;
  }


  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      email		: ['', Validators.required],
      role	: ['', Validators.required],
      password	: ['', Validators.required],
      repassword	: ['', Validators.required],
    });
  }

  onSubmit() {
    
    if (this.userForm.valid) {
      this.appService.postUsers(this.userForm.value).subscribe(
        (response) => {
          console.log(response);
          this.toastr.success('Utilisateur ajouté avec succès');
          this.userForm.reset();
          this.closeAddUserForm();
        },
        (error) => {
          console.log(error);
          this.toastr.success("Erreur lors de l'ajout")
        }
      );
    }
  }
}
