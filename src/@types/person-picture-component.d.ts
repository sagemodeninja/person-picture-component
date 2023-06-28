import { CustomComponent } from '@sagemodeninja/custom-component';

declare module '@sagemodeninja/person-picture-component' {
    export class PersonPicture extends CustomComponent {
        image?: string;
        displayName?: string;
        initials?: string;
    }
}
