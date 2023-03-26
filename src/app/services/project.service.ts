import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { Project } from '../interfaces/project.insterface';
import firebase from 'firebase/compat/app';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private afs: AngularFirestore, private usersService: UsersService, private storage: AngularFireStorage) { }
  
  createProject(project: Project, userId: string) {
    const projectsCollectionRef = this.afs.collection('projects');
    const id = this.afs.createId();
    const projectDoc = projectsCollectionRef.doc(id);
    return projectDoc.set({
      ...project,
      userId,
      projectId: id
    });
    
  }


}
