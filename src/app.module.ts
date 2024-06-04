import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';
import { PricingModule } from './pricing/pricing.module';

@Module({
  imports: [NatsModule, ProductsModule, PricingModule],
})
export class AppModule {}
