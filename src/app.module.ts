import { Module } from '@nestjs/common';
import { NatsModule } from './transports/nats.module';
import { ProductsModule } from './products/products.module';
import { PricingModule } from './pricing/pricing.module';
import { ProductCodesModule } from './product-codes/product-codes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [NatsModule, ProductsModule, PricingModule, ProductCodesModule, AuthModule, UsersModule],
})
export class AppModule {}
