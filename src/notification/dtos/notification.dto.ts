import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class NotificationDto {

    @IsNotEmpty()
    readonly sensor: string;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    readonly value: Number;

}