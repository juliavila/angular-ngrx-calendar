import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inline-svg',
  template: `
    <svg [ngClass]="cssClass">
      <use attr.xlink:href="/assets/vectors/{{name}}.svg#{{name}}"></use>
    </svg>
  `
})

export class InlineSvgComponent {
  @Input() name: string;
  @Input() cssClass: string;
}
