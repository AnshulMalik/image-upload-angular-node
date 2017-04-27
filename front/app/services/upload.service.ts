import { Injectable }from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Rx';

@Injectable()
export class UploadService {
     makeFileRequest(url: string, files: File[]): Observable<any> {
        return Observable.create((observer: Observer<String>) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("image", files[i], files[i].name);
            }
            xhr.onreadystatechange = () => {

                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.open('POST', url, true);
            var serverFileName = xhr.send(formData);
            return serverFileName;
        });
    }
}