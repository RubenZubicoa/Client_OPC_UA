import { OPCUAClient, ClientSession, ReadValueIdLike, ClientSubscription, MonitoringParametersOptions, AttributeIds, ClientMonitoredItem, TimestampsToReturn, DataValue, MessageSecurityMode, SecurityPolicy } from "node-opcua-client";

import { list } from '../data/nodeIdsList';
import { TestResult } from "../models/Test_Result";

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

export async function readPlc() {

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

  monitoredItem.on("changed", async (dataValue: DataValue) => {
    console.log(dataValue.value.value);
    const result = await readData(session);
    if(result){
      if(result.Isri_Serial_Number == '' || result.Isri_Serial_Number == null || result.Isri_Serial_Number == undefined){
        console.log('Numero de serie vacio');
        return;
      }
      await TestResult.insert(result)
      console.log('Datos introducidos correctamente');
    }
    
  });
}



async function readData(session: ClientSession) {

  // Lee todas las variables del PLC y las guarda en un objeto para luego guardarlo en la base de datos.

  var Button10_State: any = await readVariable('Button10_State', session);
  var Button10_Value: any = await readVariable('Button10_Value', session);
  var Button11_State: any = await readVariable('Button11_State', session);
  var Button11_Value: any = await readVariable('Button11_Value', session);
  var Button12_State: any = await readVariable('Button12_State', session);
  var Button12_Value: any = await readVariable('Button12_Value', session);
  var Button13_State: any = await readVariable('Button13_State', session);
  var Button13_Value: any = await readVariable('Button13_Value', session);
  // var Button1_State: any = await readVariable('Button1_State', session);
  var Button1_Value: any = await readVariable('Button1_Value', session);
  var Button2_State: any = await readVariable('Button2_State', session);
  var Button2_Value: any = await readVariable('Button2_Value', session);
  var Button3_State: any = await readVariable('Button3_State', session);
  var Button3_Value: any = await readVariable('Button3_Value', session);
  var Button4_State: any = await readVariable('Button4_State', session);
  var Button4_Value: any = await readVariable('Button4_Value', session);
  var Button5_State: any = await readVariable('Button5_State', session);
  var Button5_Value: any = await readVariable('Button5_Value', session);
  var Button6_Value: any = await readVariable('Button6_Value', session);
  var Button7_State: any = await readVariable('Button7_State', session);
  var Button7_Value: any = await readVariable('Button7_Value', session);
  var Button8_State: any = await readVariable('Button8_State', session);
  var Button8_Value: any = await readVariable('Button8_Value', session);
  var Button9_State: any = await readVariable('Button9_State', session);
  var Button9_Value: any = await readVariable('Button9_Value', session);
  var Ficticio: any = await readVariable('Ficticio', session);
  var Gan: any = await readVariable('Gan', session);
  var Hand: any = await readVariable('Hand', session);
  var Isri_Order: any = await readVariable('Isri_Order', session);
  var Isri_Serial_Number: any = await readVariable('Isri_Serial_Number', session);
  var Modelo: any = await readVariable('Modelo', session);
  var Resultado_OK: any = await readVariable('Resultado_OK', session);
  var Serial_Type: any = await readVariable('Serial_Type', session);
  var Side: any = await readVariable('Side', session);
  var TiempoCiclo: any = await readVariable('TiempoCiclo', session);

  var result:any = {
    Button10_State,
    Button10_Value,
    Button11_State,
    Button11_Value,
    Button12_State,
    Button12_Value,
    Button13_State,
    Button13_Value,
    Button1_State:2,
    Button1_Value,
    Button2_State,
    Button2_Value,
    Button3_State,
    Button3_Value,
    Button4_State,
    Button4_Value,
    Button5_State,
    Button5_Value,
    Button6_Value,
    Button7_State,
    Button7_Value,
    Button8_State,
    Button8_Value,
    Button9_State,
    Button9_Value,
    Ficticio,
    Gan,
    Hand,
    Isri_Order,
    Isri_Serial_Number,
    Modelo,
    Resultado_OK,
    Serial_Type,
    Side,
    TiempoCiclo,
    Date: new Date()
  }

  return result;
}

async function readVariable(item: any, session: ClientSession) {
  var result = await session.readVariableValue(list[item]);
  return result.value.value
}