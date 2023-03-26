import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project.insterface';
import { ProjectService } from 'src/app/services/project.service';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent {
  projectForm = this.fb.group({
    name: [''],
    description: ['']
  })
  name: string = '';
  description: string = '';
  selectedFiles: FileList | null = null;

  constructor(private projectsService: ProjectService, private usersService: UsersService, private fb: FormBuilder, private router: Router, private storage: AngularFireStorage) { }

  async createProject() {
    const currentUser = await this.usersService.getUser();
    const userId = currentUser.uid;
    const formValue = this.projectForm.value;
    const projectData: Project = {
      name: formValue.name as string,
      description: formValue.description as string
    }
    this.projectsService.createProject(projectData, userId);
    console.log("proyecto añadido");
    // Limpiar el formulario
    this.projectForm.reset();
  }
  
cancel() {
  this.router.navigate(['/home']);
}

onFileSelected(event: any) {
  this.selectedFiles = event.target.files;
}

}
