import { IotData } from 'aws-sdk';
import { NotificationViewModel } from '../repositories/NotificationRepository';
import { Logger } from './Logger';

const IOT_ENDPOINT = process.env.IOT_ENDPOINT ?? '';

export interface IOTPayload {
    room_name: string;
    user_id: string;
    data: NotificationViewModel;
}

/**
 * Publishes message to MQTT room
 *
 * @param IOTPayload
 * @returns {Promise<void>}
 */
export async function publish(payload: IOTPayload): Promise<unknown> {
    const request = {
        /**
         * The name of the MQTT topic.
         */
        topic: payload.room_name,
        /**
         * The Quality of Service (QoS) level.
         */
        qos: 1,
        /**
         * The state information, in JSON format.
         */
        payload: JSON.stringify(payload),
    };

    const IOT = new IotData({
        endpoint: IOT_ENDPOINT,
        apiVersion: '2015-05-28',
    });

    Logger.info('IoT MQTT Publish', { request, IOT_ENDPOINT, IOT });
    return await IOT.publish(request).promise();
}
