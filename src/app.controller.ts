import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController{
    constructor(
        @Inject()
        private readonly appService:AppService,
    ){}
    // Por ejemplo, un método para manejar una solicitud GET a la raíz
    @Get()
    getHello(): string {
      return this.appService.getHello();
    }
}