/* Represents the data that we send to Firebase for upload */
export class Upload {
    $key: string;
    url: string;
    file: File;
    status: number;
    creationDate: Date = new Date();
    name: string;

    constructor (file: File) {
        this.file = file;
    }
}
