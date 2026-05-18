import { Kafka, Producer, Consumer, Message, RecordMetadata } from 'kafkajs';
import config from '../config/config.js';
import logger from '../config/logger.js';

class KafkaService {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumers: Map<string, Consumer> = new Map();

  constructor() {
    this.kafka = new Kafka({
      clientId: config.KAFKA_CLIENT_ID,
      brokers: config.KAFKA_BROKERS,
      // Optional: Add basic retry config
      retry: {
        initialRetryTime: 300,
        retries: 5,
      },
    });
  }

  /**
   * Connects the Kafka Producer.
   */
  async connectProducer(): Promise<Producer> {
    if (this.producer) {
      return this.producer;
    }

    try {
      logger.info('Connecting Kafka Producer...');
      this.producer = this.kafka.producer();
      await this.producer.connect();
      logger.info('🚀 Kafka Producer connected successfully');
      return this.producer;
    } catch (error) {
      logger.error('Failed to connect Kafka Producer:', error);
      this.producer = null;
      throw error;
    }
  }

  /**
   * Connects and returns a Kafka Consumer for a given groupId.
   */
  async getConsumer(groupId: string): Promise<Consumer> {
    if (this.consumers.has(groupId)) {
      return this.consumers.get(groupId)!;
    }

    try {
      logger.info(`Connecting Kafka Consumer for group: ${groupId}...`);
      const consumer = this.kafka.consumer({ groupId });
      await consumer.connect();
      this.consumers.set(groupId, consumer);
      logger.info(`🚀 Kafka Consumer group '${groupId}' connected successfully`);
      return consumer;
    } catch (error) {
      logger.error(`Failed to connect Kafka Consumer group '${groupId}':`, error);
      throw error;
    }
  }

  /**
   * Sends a message to a specific topic.
   */
  async sendMessage(topic: string, messages: Message[]): Promise<RecordMetadata[]> {
    if (!this.producer) {
      await this.connectProducer();
    }

    try {
      const response = await this.producer!.send({
        topic,
        messages,
      });
      logger.debug(`[Kafka] Message sent to topic '${topic}'`);
      return response;
    } catch (error) {
      logger.error(`[Kafka] Error sending message to topic '${topic}':`, error);
      throw error;
    }
  }

  /**
   * Disconnects the producer and all consumers.
   */
  async disconnect(): Promise<void> {
    try {
      if (this.producer) {
        logger.info('Disconnecting Kafka Producer...');
        await this.producer.disconnect();
        this.producer = null;
      }

      for (const [groupId, consumer] of this.consumers.entries()) {
        logger.info(`Disconnecting Kafka Consumer group '${groupId}'...`);
        await consumer.disconnect();
      }
      this.consumers.clear();

      logger.info('Kafka disconnected successfully');
    } catch (error) {
      logger.error('Error during Kafka disconnect:', error);
    }
  }
}

export const kafkaService = new KafkaService();
export default kafkaService;
