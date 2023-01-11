import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = 'https://cdn.document360.io/da52b302-22aa-4a71-9908-ba18e68ffee7/Images/Documentation/Screenshot%20from%202022-04-05%2022-42-58.png';
  showImg = true;
  token = "";
  imgRta = "";

  logedUser = {
    id: "",
    name: "",
    email: "",
    password: "",
  };

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.profile()
      .subscribe()
    }
  }

  onLoaded(img: string){
    console.log("log padre", img)
  }
  toggleImg(){
    this.showImg = !this.showImg
  }

  createUser(){
    this.usersService.create({
      name: '',
      email: "",
      password: "",
      role: "",
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login(){
    this.authService.login("admin@mail.com", "admin1234")
    .subscribe(rta => {
      console.log(rta.access_token);
      this.token = rta.access_token;
    });
  }

  getProfile(){
    this.authService.profile()
    .subscribe(profile => {
      this.logedUser = profile;
    });
  }

  downloadPDF(){
    this.fileService.getFile("my.pdf", "https://young-sands-07814.herokuapp.com/api/files/dummy.pdf", "aplication/pdf")
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileService.uploadFile(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
      })
    }

  }
}
