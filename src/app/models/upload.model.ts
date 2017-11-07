/* Represents the data that we send to Firebase for upload */
export class Upload {
    $key: string;
    url: string;
    file: File;
    status: number;
    like: number;
    dislike: number;
    creationDate: string = new Date().toDateString();
    name: string;
    //comment: string;

    constructor (file: File) {
        this.file = file;
    }
}
