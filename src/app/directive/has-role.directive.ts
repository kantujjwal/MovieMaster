import { Directive, ElementRef, Input, Renderer2} from '@angular/core';
import { TokenStorageService } from '../Services/token-storage.service';

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {
  private currentUser = this.token.getUser();
  private roles: string[] = [];

  @Input() set hasRole(val: string[]) {
    this.roles = val;
    this.updateView();
  }
  constructor(private el: ElementRef,
    private token: TokenStorageService,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    const marchingRoles = this.roles.filter(role => this.currentUser?.roles.includes(role));
    if (marchingRoles && marchingRoles.length > 0) {
      if(this.el.nativeElement.class && this.el.nativeElement.class.includes("access-denied")){
        setTimeout(()=>{
          this.el.nativeElement.disabled = false;
          this.renderer.removeClass(this.el.nativeElement, "mat-button-disabled");
          this.renderer.removeClass(this.el.nativeElement, "access-denied");
          this.renderer.removeAttribute(this.el.nativeElement, "title");
        }, 100);
      }
    } else {
      this.renderer.addClass(this.el.nativeElement, "access-denied");
      this.renderer.setAttribute(this.el.nativeElement, "title", "Access Denied");
      setTimeout(()=>{
        this.el.nativeElement.disabled = true;
        this.renderer.addClass(this.el.nativeElement, "mat-button-disabled");
      }, 100);
    }
  }
}
