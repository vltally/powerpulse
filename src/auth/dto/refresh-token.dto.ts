import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token of the user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTRmZGVmMmVhNDRiZjRkZDMxZGU5MiIsImlhdCI6MTY5Mzk0MTkwNSwiZXhwIjoxNjk0NTQ2NzA1fQ.lDz2hMiY9C67_adOOiebQ_IkxgUyZ-pBP5sTKVE4qOM',
  })
  refreshToken: string;
}
