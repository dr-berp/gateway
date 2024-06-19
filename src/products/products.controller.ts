import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { Auth, CurrentUser, Role, User } from 'src/auth';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto, ValidateProductsDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get('health')
  healthCheck() {
    return this.client.send('product.health', {}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post()
  @Auth(Role.Admin, Role.Moderator)
  create(@Body() createProductDto: CreateProductDto, @User() user: CurrentUser) {
    return this.client.send('product.create', { createProductDto, user }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  @Auth()
  findAll(@Query() paginationDto: PaginationDto, @User() user: unknown) {
    return this.client.send('product.findAll', { paginationDto, user }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.findOne', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch()
  @Auth(Role.Admin, Role.Moderator)
  patch(@Body() updateProductDto: UpdateProductDto) {
    return this.client.send('product.update', updateProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  @Auth(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.remove', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('restore/:id')
  @Auth(Role.Admin)
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.restore', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('validate')
  @Auth()
  validate(@Body() validateProductDto: ValidateProductsDto) {
    return this.client.send('product.validate', validateProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
