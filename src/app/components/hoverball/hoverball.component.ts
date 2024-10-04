import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hoverball',
  templateUrl: './hoverball.component.html',
  styleUrl: './hoverball.component.scss'
})
export class HoverballComponent {

  @Input() inputTextLine1:any;
  @Input() inputTextLine2:any;
  @Input() inputTextLine3:any;
}
