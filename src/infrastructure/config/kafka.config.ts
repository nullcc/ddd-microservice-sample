export const KAFKA_CONFIG = {
  name: 'KAFKA_SERVICE',
  clientId: process.env.KAFKA_CLIENT_ID || 'ddd-mircoservice-sample',
  group: {
    user: 'user',
  },
  brokers: ['localhost:29092'],
};
