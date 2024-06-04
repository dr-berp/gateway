import { Module } from '@nestjs/common';
import { ProductCodesController } from './product-codes.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductCodesController],
  imports: [NatsModule],
})
export class ProductCodesModule {}
