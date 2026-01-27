import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, ValidateNested, IsObject, IsEnum, IsDate, IsUUID, IsEmail, IsUrl, IsNotEmpty, Length, Min, Max } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDto {

    

    @IsNotEmpty()
    @IsString()
    @Length(1, 100)
    @ApiProperty({ example: "Loki", description: 'Name of the entity' })
    readonly name: string;
}