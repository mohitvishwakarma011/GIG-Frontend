import { Component, Input } from "@angular/core";

@Component({
    selector: 'ngx-card',
    standalone: false,
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() config: { width?: string, padding?: string } = null;

}