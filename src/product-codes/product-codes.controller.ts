import { Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductCodeDto, UpdateProductCodeDto } from './dto';
import { Auth, CurrentUser, Role, User } from 'src/auth';

@Controller('products_codes')
export class ProductCodesController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('health')
  healthCheck() {
    return this.client.send('product.code.health', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post()
  @Auth(Role.Admin, Role.Moderator)
  create(@Payload() createProductCodeDto: CreateProductCodeDto, @User() user: CurrentUser) {
    return this.client.send('product.code.create', { createProductCodeDto, user }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('product.code.findAll', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.code.findOne', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch()
  @Auth(Role.Admin, Role.Moderator)
  update(@Payload() updateProductCodeDto: UpdateProductCodeDto) {
    return this.client.send('product.code.update', updateProductCodeDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  @Auth(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.code.remove', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('restore/:id')
  @Auth(Role.Admin)
  restore(@Payload('id', ParseIntPipe) id: number) {
    return this.client.send('product.code.restore', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
