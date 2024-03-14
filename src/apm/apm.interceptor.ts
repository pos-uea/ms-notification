import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { ApmService } from "./apm.service";


@Injectable()
export class ApmInterceptor implements NestInterceptor {

  constructor(private readonly apmService: ApmService) {}
  
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    

    const [IncomingMessage, ...res] = context.getArgs();

    this.apmService.setTransactionName(
      `${IncomingMessage.method} ${IncomingMessage.url}`
    );

    return next.handle();
  }
}