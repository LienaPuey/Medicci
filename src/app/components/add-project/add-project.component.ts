import { Component, ElementRef, ViewChild } from '@angular/core';
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
  selectedFiles!: FileList;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLDivElement>;

  constructor(private projectsService: ProjectService, private usersService: UsersService, private fb: FormBuilder, private router: Router, private storage: AngularFireStorage) { }

  async createProject() {
    const currentUser = await this.usersService.getUser();
    const userId = currentUser.uid;
    const formValue = this.projectForm.value;
    const projectData: Project = {
      name: formValue.name as string,
      description: formValue.description as string,
      images: []
    };
  
    if (this.selectedFiles) {
      const files = Array.from(this.selectedFiles);
      for (const file of files) {
        const imageUrl = await this.projectsService.uploadImage(file);
        projectData.images.push(imageUrl);
      }
    }
  
    this.projectsService.createProject(projectData, userId);
    console.log("proyecto añadido");
    // Limpiar el formulario
    this.projectForm.reset();
    this.router.navigate(['/profile']);
  }
  
cancel() {
  this.router.navigate(['/home']);
}

onFileSelected(event: any) {
  this.selectedFiles = event.target.files;
  if (this.selectedFiles) {
    // Limpiar la previsualización anterior
    this.imagePreview.nativeElement.innerHTML = '';

    // Crear elementos img para cada archivo seleccionado
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.style.width = '200px'; // Aplicar estilo de ancho
        img.style.height = '200px'; // Aplicar estilo de alto
        img.className = 'img-thumbnail mx-2';
        this.imagePreview.nativeElement.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  }
}

}
