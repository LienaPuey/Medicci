import { collection, collectionData, query, where } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { UsersService } from './users.service';
import { Project } from '../interfaces/project.insterface';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
  constructor(private afs: AngularFirestore, private usersService: UsersService, private storage: AngularFireStorage) { 
  }
  
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
  async uploadImage(file: File): Promise<string> {
    const filePath = `projects/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    return task.then((snapshot) => snapshot.ref.getDownloadURL());
  }

  getProjectsForLoggedUser(userId: string): Observable<Project[]>{
    const ordersRef = collection(this.afs.firestore, 'projects');
    const filterByUserId = where('userId', '==', userId);
    const ordersByTodayQuery = query(ordersRef, filterByUserId);
    return collectionData(ordersByTodayQuery) as Observable<Project[]>;

  }

}
