import { OPCUAClient, ReadValueIdLike, ClientSubscription, MonitoringParametersOptions, AttributeIds, ClientMonitoredItem, TimestampsToReturn, DataValue, MessageSecurityMode, SecurityPolicy } from "node-opcua-client";

import {  } from 'node-opcua-client';

const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
}

const options = {
    applicationName: 'opc_client',
    connectionStrategy: connectionStrategy,
    securityMode: MessageSecurityMode.None,
    securityPolicy: SecurityPolicy.None,
    endpoint_must_exist: false,
};

const endpointUrl = 'opc.tcp://10.73.83.172:4840';
const client = OPCUAClient.create(options);

export async function readPlc(){
    try {
        await client.connect(endpointUrl);        
        console.log('Client connected!!')
    } catch (error) {
        console.log(error)
    }
}