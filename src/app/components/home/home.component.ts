import { ProjectService } from 'src/app/services/project.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Map, tileLayer } from 'leaflet';
import { Project } from 'src/app/interfaces/project.insterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements AfterViewInit, OnInit {
  closeResult = '';
  activeButtonIndex: number | null = null;

  constructor(private modalService: NgbModal, private projectService: ProjectService){}

  ngOnInit(): void {

  }

  open(content:any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-xl-title', size: 'lg' }).result.then(
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


  ngAfterViewInit(): void {
    const map = new Map('map').setView([41.3809, 2.1698], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    maxZoom: 19,
	    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
	
  setActiveButton(index: number): void {
    this.activeButtonIndex = index;
  }
}
