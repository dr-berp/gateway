import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto, ValidateProductsDto } from './dto';
import { AuthGuard } from 'src/auth/guards';
import { User } from 'src/auth/decorators';

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
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send('product.create', createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() paginationDto: PaginationDto, @User() user: unknown) {
    return this.client.send('product.findAll', { paginationDto, user }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.findOne', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch()
  patch(@Body() updateProductDto: UpdateProductDto) {
    return this.client.send('product.update', updateProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.remove', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.restore', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post('validate')
  validate(@Body() validateProductDto: ValidateProductsDto) {
    return this.client.send('product.validate', validateProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
