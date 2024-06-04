import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';
import { PricingModule } from './pricing/pricing.module';
import { ProductCodesModule } from './product-codes/product-codes.module';

@Module({
  imports: [NatsModule, ProductsModule, PricingModule, ProductCodesModule],
})
export class AppModule {}
