import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { apiUrlInterceptor } from './api-url.interceptor';
import { HttpClient, withInterceptors } from '@angular/common/http';

describe('ApiUrlInterceptor', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [withInterceptors([apiUrlInterceptor])],
    });
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should prepend the environment apiUrl to the request url', () => {
    const url = '/api/data';
    const expectedUrl = `${environment.apiUrl}${url}`;

    TestBed.inject(HttpClient)
      .get(url)
      .subscribe(response => {
        expect(response).toBeTruthy();
      });

    const httpRequest = httpMock.expectOne(expectedUrl);
    expect(httpRequest.request.url).toEqual(expectedUrl);

    httpRequest.flush({});
  });
});
