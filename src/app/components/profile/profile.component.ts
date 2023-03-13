import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers:[NgbActiveModal],
})
export class ProfileComponent {
  constructor(public modal: NgbModal, public activeModal: NgbActiveModal){}

    seeModal(modal:any){
    this.modal.open(modal, {centered:true});
      }
  closeModal() {
    this.activeModal.dismiss();
  }
}
