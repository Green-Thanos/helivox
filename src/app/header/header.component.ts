import { Component, ViewChild, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';
import { DropdownService } from '../shared/dropdown.service';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('dpdn') dpdn: ElementRef;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  innerWidth = window.innerWidth;

  isOpen = false;


  

  // Constantly checking dropdown service to see if isOpen has changed, if so the dropdown view changes

  ngOnInit(): void {
    this.ddService.buttonEmitter.subscribe(isOpen => {
      this.renderer[isOpen ? 'removeClass' : 'addClass'](this.dpdn.nativeElement, 'dpdn');
      this.isOpen = isOpen;
    })

    
  }

  // If user clicks onto a new page the dropdown should go away, so this uses dropdown service to change the value of isOpen in the directive so ngOnInit can react 
  
  cancelDropdown(){
    if(this.isOpen){
      this.isOpen = !this.isOpen;
      this.renderer[this.isOpen ? 'removeClass' : 'addClass'](this.dpdn.nativeElement, 'dpdn');

      this.ddService.buttonEmitterCancelled.emit(this.isOpen);
    }

  }

  constructor(private ddService: DropdownService, private renderer: Renderer2){}

}
