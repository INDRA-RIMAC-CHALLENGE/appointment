import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { envConfig, Environment } from 'src/infraestructure/config/main.config';

@Injectable()
export class DynamoDBService {
  private dynamoDb: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDb =
      envConfig.NODE_ENV === Environment.local
        ? new DynamoDB.DocumentClient({
            region: envConfig.AWS_REGION,
            accessKeyId: envConfig.AWS_ACCESS_KEY_ID,
            secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
          })
        : new DynamoDB.DocumentClient();
  }

  async putItem(
    tableName: string,
    item: Record<string, any>,
  ): Promise<DynamoDB.DocumentClient.PutItemOutput> {
    const params = {
      TableName: tableName,
      Item: item,
    };
    return this.dynamoDb.put(params).promise();
  }

  async getItem(
    tableName: string,
    key: Record<string, any>,
  ): Promise<DynamoDB.DocumentClient.GetItemOutput> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key,
    };

    return this.dynamoDb.get(params).promise();
  }

  async scanTable(
    tableName: string,
    filters: Record<string, any> = {},
  ): Promise<DynamoDB.DocumentClient.ScanOutput> {
    const expressionParts: string[] = [];
    const expressionValues: { [key: string]: any } = {};
    const expressionNames: { [key: string]: string } = {};

    Object.entries(filters).forEach(([key, value]) => {
      const attributeKey = `#${key}`;
      const valueKey = `:${key}`;

      expressionParts.push(`${attributeKey} = ${valueKey}`);
      expressionNames[attributeKey] = key;
      expressionValues[valueKey] = value;
    });

    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
    };

    if (expressionParts.length > 0) {
      params.FilterExpression = expressionParts.join(' AND ');
      params.ExpressionAttributeNames = expressionNames;
      params.ExpressionAttributeValues = expressionValues;
    }

    return this.dynamoDb.scan(params).promise();
  }

  async scanWithPagination(
    tableName: string,
    limit: number,
    filters: Record<string, any> = {},
    lastEvaluatedKey?: DynamoDB.DocumentClient.Key,
  ) {
    const expressionParts: string[] = [];
    const expressionValues: { [key: string]: any } = {};
    const expressionNames: { [key: string]: string } = {};

    // Construir dinámicamente los filtros
    Object.entries(filters).forEach(([key, value]) => {
      const attributeKey = `#${key}`;
      const valueKey = `:${key}`;

      expressionParts.push(`${attributeKey} = ${valueKey}`);
      expressionNames[attributeKey] = key;
      expressionValues[valueKey] = value;
    });

    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: tableName,
      Limit: limit,
    };

    if (expressionParts.length > 0) {
      params.FilterExpression = expressionParts.join(' AND ');
      params.ExpressionAttributeNames = expressionNames;
      params.ExpressionAttributeValues = expressionValues;
    }

    const result = await this.dynamoDb.scan(params).promise();
    return {
      items: result.Items,
    };
  }

  async removeItem(tableName: string, key: DynamoDB.DocumentClient.Key) {
    const params: DynamoDB.DocumentClient.Delete = {
      TableName: tableName,
      Key: key,
    };

    return this.dynamoDb.delete(params).promise();
  }
}
