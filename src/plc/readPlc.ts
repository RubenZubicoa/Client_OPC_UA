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

    // connect to endpoint
    try {
        await client.connect(endpointUrl);        
        console.log('Client connected!!')
    } catch (error) {
        console.log(error)
    }

    // create ession
    const session = await client.createSession();
    console.log("session created !");

    // install a subscription and install a monitored item
    const subscription = ClientSubscription.create(session, {
        requestedPublishingInterval: 1000,
        requestedLifetimeCount: 100,
        requestedMaxKeepAliveCount: 10,
        maxNotificationsPerPublish: 100,
        publishingEnabled: true,
        priority: 10
      });
  
      subscription.on("started", function () {
        console.log("subscription started - subscriptionId=", subscription.subscriptionId);
      }).on("keepalive", function () {
  
      }).on("terminated", function () {
        console.log("terminated");
      });

      const itemToMonitor: ReadValueIdLike = {
        nodeId: 'ns=4;s=OPC_Time',
        attributeId: AttributeIds.Value
      };
      const parameters: MonitoringParametersOptions = {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 10
      };

      const monitoredItem = ClientMonitoredItem.create(
        subscription,
        itemToMonitor,
        parameters,
        TimestampsToReturn.Both
      );

      monitoredItem.on("changed", (dataValue: DataValue) => {
        console.log(dataValue.value.value);
      });
}