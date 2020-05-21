import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import { Game } from '../../interfaces/interfaces';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados()
    .subscribe(res=>{

      this.juegos = res;

    });
  }

  votarJuego(juego: Game){

    //console.log(juego);
    this.gameService.votarJuego(juego.id).subscribe((resp:{ok:boolean, mensaje:string}) =>{
      console.log(resp);
      if(resp.ok){

        Swal.fire({
           title: '¡Gracias!',
           text: resp.mensaje,
           icon: 'success',
           confirmButtonText: 'Ok'
        });

      }else{

        
        Swal.fire({
           title: '¡Oops!',
           text: resp.mensaje,
           icon: 'error',
           confirmButtonText: 'Ok'
        })
        

      }
    });

  }

}
