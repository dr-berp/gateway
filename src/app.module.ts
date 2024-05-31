import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [NatsModule, ProductsModule],
})
export class AppModule {}
