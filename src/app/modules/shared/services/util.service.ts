import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private KeycloakService: KeycloakService) { }

  getRoles(){
    return this.KeycloakService.getUserRoles();
  }
  isAdmin(){
    let roles = this.KeycloakService.getUserRoles().filter(role => role == "admin");

    if(roles.length > 0)
      return true;
    else
    return false;
  }
}
