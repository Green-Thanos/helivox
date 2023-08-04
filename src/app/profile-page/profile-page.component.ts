import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../shared/services/dta.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ImageService } from '../shared/services/image.service';
import { User } from '../shared/templates/user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit{

  @ViewChild('imgInput') imgInput: ElementRef;

  currentImage: any;

  unloaded = false;

  selectedFile = 'Choose File';
  
  user = this.dta.getUser();

  userList: any;
  userListKeys: any;

  rolesList = ['User', 'Volunteer', 'Editor', 'Admin'];
  selectedUser = -1;

  openAdminSort = false;
  currentRoleSort = -1;
  searchText = "";


  ngOnInit(): void {
    if(this.dta.getUser().role < 0){
      this.router.navigateByUrl('');
    }
    if(this.dta.getUser().role >= 3){
      this.unloaded = true;
      this.http.get("https://helivox-2-default-rtdb.firebaseio.com/Users.json/?auth=" + this.user.token).subscribe(resData => {
        this.unloaded = false;
        this.userListKeys = Object.keys(resData);
        this.userList = resData;
      })
    }
  }



  checkIfValid(uid: string){
    if(this.searchText !== "" && !this.userList[uid].email.includes(this.searchText)){
      return false;
    }
    if(this.currentRoleSort !== -1 && +this.userList[uid].role !== this.currentRoleSort){
      return false;
    }
    return true;
  }

  changeRole(index: number, role: number){
    this.selectedUser = -1;
    this.userList[this.userListKeys[index]].role = role;
    this.dta.patchData({
      role: ""+role
    }, 'Users/' + this.userList[this.userListKeys[index]].token);
  }

  deleteUser(index: number){
    this.dta.deleteData(this.userList[this.userListKeys[index]].token, "Users");
    this.userListKeys.splice(index, 1);
    delete this.userList[this.userListKeys[index]];
  }

  deleteSignedInUser(){
    const user = this.dta.getUser();
    this.dta.deleteData(user.uid, "Users");
    this.auth.deleteUser(user.token);
  }

  logout(){
    this.auth.logout();
  }
  
  processFile(e: Event){
    const input = e.target as HTMLInputElement;
    this.unloaded = true;
    this.imgService.processFile(input.files[0]).subscribe((res: {data: {display_url: string}}) => {
      this.dta.setAlertData('Upload Success!', true, '#07E607');
      this.imgInput.nativeElement.value = '';
      this.unloaded = false;
      this.dta.getUser().profile_picture = res.data.display_url;
      const userData = this.dta.getUser();
      localStorage.setItem("userData", JSON.stringify(new User(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate), userData.role, userData.profile_picture)))
      this.dta.patchData({
        profile_picture: res.data.display_url
      }, "Users/" + this.dta.getUser().uid)
    });
  }



  pfp(){
    if(this.dta.getUser().profile_picture !== undefined){
      return this.dta.getUser().profile_picture;
    }
    return '../../assets/anonymous.png';
  }

  constructor(private dta: DataService, private router: Router, private auth: AuthService, private imgService: ImageService, private http: HttpClient){}
}
