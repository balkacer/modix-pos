import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginRequestDto } from '@modix/pkgs/contracts';

export class LoginDto implements LoginRequestDto {
  @ApiProperty({
    example: 'admin@frekao.com'
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password123'
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
