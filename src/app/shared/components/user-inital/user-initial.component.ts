import { Component, Input } from "@angular/core";

@Component({
    selector: 'ngx-user-initial',
    standalone: false,
    templateUrl: './user-initial.component.html',
    styleUrl: './user-initial.component.scss'
})
export class UserInitialComponent {
    @Input() name: string = '';
    @Input() size: string = '40px';

    protected backgroundColor: string = '';
    protected textColor: string = '';
    protected outlineColor: string = '';

    private readonly bgArray = [
        {
            key: 'gray',
            bg: 'rgba(69, 69, 69, 0.12)',
            text: 'rgba(69, 69, 69)',
            outline: 'rgba(69, 69, 69, 0.20)'
        },
        {
            key: 'green',
            bg: 'rgba(18, 208, 28, 0.12)',
            text: '#005C00',
            outline: 'rgba(0, 122, 0, 0.20)'
        }, {
            key: 'red',
            bg: 'rgba(213, 0, 0, 0.12)',
            text: '#D50000',
            outline: 'rgba(213, 0, 0, 0.20)'
        }, {
            key: 'blue',
            bg: 'rgba(24, 129, 227, 0.12)',
            text: '#005BB0',
            outline: 'rgba(0, 69, 188, 0.20)'
        }, {
            key: 'orange',
            bg: 'rgba(241, 140, 40, 0.12)',
            text: '#B05301',
            outline: 'rgba(141, 94, 0, 0.20)'
        },
        {
            key: 'purple',
            bg: 'rgba(123, 31, 162, 0.12)',
            text: '#6A1B9A',
            outline: 'rgba(123, 31, 162, 0.20)'
        },
        {
            key: 'pink',
            bg: 'rgba(233, 30, 99, 0.12)',
            text: '#C2185B',
            outline: 'rgba(233, 30, 99, 0.20)'
        },
        {
            key: 'teal',
            bg: 'rgba(0, 150, 136, 0.12)',
            text: '#00695C',
            outline: 'rgba(0, 150, 136, 0.20)'
        },
        {
            key: 'cyan',
            bg: 'rgba(0, 188, 212, 0.12)',
            text: '#00838F',
            outline: 'rgba(0, 188, 212, 0.20)'
        },
        {
            key: 'indigo',
            bg: 'rgba(63, 81, 181, 0.12)',
            text: '#3949AB',
            outline: 'rgba(63, 81, 181, 0.20)'
        },
    ]

    public constructor() {
        this.setBgAndTextColor();
    }

    getInitials(): string {
        if (!this.name) {
            return '?';
        }

        return this.name
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    }

    private setBgAndTextColor(): void {
        const randomColor = this.bgArray[Math.floor(Math.random() * 10)];
        this.backgroundColor = randomColor.bg;
        this.textColor = randomColor.text;
        this.outlineColor = `1px solid ${randomColor.outline}`
    }
}
