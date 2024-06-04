import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { PricingController } from './pricing.controller';

@Module({
  controllers: [PricingController],
  imports: [NatsModule],
})
export class PricingModule {}
