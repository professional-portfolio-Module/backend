import { connect, NatsConnection, JSONCodec, Subscription } from 'nats';
import config from '../config/config.js';
import logger from '../config/logger.js';

class NatsService {
  private nc: NatsConnection | null = null;
  private codec = JSONCodec();

  /**
   * Connects to NATS Server.
   */
  async getConnection(): Promise<NatsConnection> {
    if (this.nc) {
      return this.nc;
    }

    try {
      logger.info(`Connecting to NATS Server at: ${config.NATS_URI}...`);
      this.nc = await connect({
        servers: config.NATS_URI,
        reconnect: true,
        maxReconnectAttempts: -1, // Reconnect infinitely
        reconnectTimeWait: 2000,
      });
      
      logger.info('🚀 Connected to NATS Server successfully');
      return this.nc;
    } catch (error) {
      logger.error(`Failed to connect to NATS Server at ${config.NATS_URI}:`, error);
      this.nc = null;
      throw error;
    }
  }

  /**
   * Publishes JSON message to a NATS subject.
   */
  async publish(subject: string, data: any): Promise<void> {
    try {
      const client = await this.getConnection();
      client.publish(subject, this.codec.encode(data));
      logger.debug(`[NATS] Message published to subject '${subject}'`);
    } catch (error) {
      logger.error(`[NATS] Error publishing message to subject '${subject}':`, error);
      throw error;
    }
  }

  /**
   * Subscribes to a subject and yields messages.
   */
  async subscribe(subject: string): Promise<Subscription> {
    try {
      const client = await this.getConnection();
      logger.info(`[NATS] Subscribing to subject '${subject}'`);
      return client.subscribe(subject);
    } catch (error) {
      logger.error(`[NATS] Error subscribing to subject '${subject}':`, error);
      throw error;
    }
  }

  /**
   * Decodes a binary NATS message payload to a Javascript object.
   */
  decode(data: Uint8Array): any {
    return this.codec.decode(data);
  }

  /**
   * Disconnects the NATS client.
   */
  async disconnect(): Promise<void> {
    if (this.nc) {
      try {
        logger.info('Disconnecting NATS client...');
        await this.nc.drain();
        await this.nc.close();
        this.nc = null;
        logger.info('NATS disconnected cleanly');
      } catch (error) {
        logger.error('Error during NATS disconnect:', error);
      }
    }
  }
}

export const natsService = new NatsService();
export default natsService;
