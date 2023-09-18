import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showSuccess(description : any, title : any){
    this.toastr.success(description, title)
}

showError(description : any, title : any){
    this.toastr.error(description, title)
}

showInfo(description : any, title : any){
    this.toastr.info(description, title)
}

showWarning(description : any, title : any){
    this.toastr.warning(description, title)
}

}
