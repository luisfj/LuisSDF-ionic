import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../_config/api.config';
import { PessoaDTO } from '../_models/pessoa.dto';
import { PessoaRegistroDTO } from '../_models/pessoa.registro.dto';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  path: string = '/pessoa';

  constructor(public http: HttpClient) { }

  findById(id:number) : Observable<PessoaDTO> {
    return this.http.get<PessoaDTO>(`${API_CONFIG.baseUrl}${this.path}/${id}`);    
  }

  findAll(pagina:number=0, registros:number = 10) : Observable<PessoaDTO[]> {
    return this.http.get<PessoaDTO[]>(`${API_CONFIG.baseUrl}${this.path}/?pagina=${pagina}&registros=${registros}`);    
  }

  register(obj : PessoaRegistroDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}${this.path}`,
    obj,
    {
      observe: 'response',
      responseType: 'text'
    });    
  }

  update(obj : PessoaRegistroDTO) {
    return this.http.put(`${API_CONFIG.baseUrl}${this.path}`,
    obj,
    {
      observe: 'response',
      responseType: 'text'
    });    
  }

  remove(id:number) {
    return this.http.delete(`${API_CONFIG.baseUrl}${this.path}/${id}`);    
  }
}
