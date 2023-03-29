import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interfaces/project.insterface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
	
  closeResult = '';
  projects: Project[] =[];
  selectedProject: Project |undefined;

  constructor(private modalService: NgbModal, private userService: UsersService,private projectService: ProjectService, private storage: AngularFireStorage){}
  ngOnInit(): void {
	this.projectService.getProjectsForLoggedUser(this.userService.getUserFromStore().uid).subscribe(projects => {
		console.log(projects);
		this.projects = projects;
	  })
	}

  openProject(content:any, project: Project) {
	this.selectedProject = project;
		this.modalService.open(content, { ariaLabelledBy: 'projectModalLabel', size: 'lg' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
	open(content:any) {
			this.modalService.open(content, { ariaLabelledBy: 'projectModalLabel', size: 'lg' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				},
			);
		}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
