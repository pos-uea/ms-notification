import { Injectable } from "@nestjs/common";
import * as apm from "elastic-apm-node/start";

@Injectable()
export class ApmService {
  apm: any;

  constructor() {
    if (apm.isStarted()) {
      this.apm = apm;
      console.log("APM start");
    }
  }

  captureError(data: any) {
    this.apm.captureError(data);
  }

  startTransaction(name, type): any {
    console.log('startTransaction...',name, type)
    return this.apm.startTransaction(name, type);
  }

  setTransactionName(name) {
    console.log('setTransactionName...',name)
    return this.apm.setTransactionName(name);
  }

  startSpan(name) {
    console.log('startSpan...',name)
    return this.apm.startSpan(name);
  }
}