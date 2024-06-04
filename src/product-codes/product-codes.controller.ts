import { Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { CreateProductCodeDto, UpdateProductCodeDto } from './dto';

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
  create(@Payload() createProductCodeDto: CreateProductCodeDto) {
    return this.client.send('product.code.create', createProductCodeDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send('product.code.findAll', paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.code.findOne', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch()
  update(@Payload() updateProductCodeDto: UpdateProductCodeDto) {
    return this.client.send('product.code.update', updateProductCodeDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send('product.code.remove', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch('restore/:id')
  restore(@Payload('id', ParseIntPipe) id: number) {
    return this.client.send('product.code.restore', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
