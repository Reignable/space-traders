import { HttpClient, withInterceptors } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '..';
import { authorizationInterceptor } from './authorization.interceptor';

const mockAuthService = {
  token: jest.fn(),
};

describe('AuthorizationInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        withInterceptors([authorizationInterceptor]),
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header with the token from the AuthService', () => {
    const token = 'my-token';
    mockAuthService.token.mockReturnValue(token);

    httpClient.get('/api/data').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/api/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toEqual(
      `Bearer ${token}`
    );

    httpRequest.flush({});
  });

  it('should not add an Authorization header for a register request', () => {
    httpClient.post('/api/register', {}).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne('/api/register');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();

    httpRequest.flush({});
  });

  it('should throw an error if the token is undefined', () => {
    mockAuthService.token.mockReturnValue(undefined);

    httpClient.get('/api/data').subscribe({
      error: error => {
        expect(error).toBeTruthy();
        expect(error.message).toEqual('No auth token');
      },
    });

    httpMock.expectNone('/api/data');
  });
});
