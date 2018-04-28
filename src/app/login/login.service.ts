import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
public token: String;
private url ="http://localhost:4040/login";
private headers = new Headers ({ 'Content-Type': 'application/json', 'Acess-Control-Allow': '*'});  
private options = new RequestOptions({ headers: this.headers});

constructor(private http: Http) { 
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.token = currentUser && currentUser.token;
}

login(username, password): Observable<boolean> {
  let body = JSON.stringify({ username: username, password: password});
  return this.http.post(this.url, body, this.options)
  .map((response: Response) => {
    let token = response.json() && response.json().token;
  if (token){
    this.token = token;
    localStorage.setItem( 'currentUser', JSON.stringify({username: username, token: token}));

    return true;
  } else {
    return false;
  }});

}
logout(): void{
  this.token = null;
  localStorage.removeItem('currentUser'); 
}
}