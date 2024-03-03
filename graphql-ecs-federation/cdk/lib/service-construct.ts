import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

interface ServiceConstructProps{
    namespaceName: string;
    cluster: ecs.ICluster;
    serviceName: string;
    containerPort: number;
    imagePath: string;
    dnsName: string;
    portName: string;
}

export class ServiceConstruct extends Construct{
    constructor(stack: Construct, id: string, props: ServiceConstructProps){
       super(stack, id);
       const taskDefinition = new ecs.FargateTaskDefinition(this, `${props.serviceName}Definition`, {
        cpu: 512,
        memoryLimitMiB: 2048,
        });
       taskDefinition.addContainer(`${props.serviceName}Container`, {
        containerName: props.serviceName,
        image:  ecs.ContainerImage.fromAsset(props.imagePath),
        logging: ecs.LogDriver.awsLogs({ streamPrefix: props.serviceName }),
        portMappings: [
            { containerPort: props.containerPort, name: props.portName } // important. Default is no port mapping
        ]
        });
       const service = new ecs.FargateService(this, props.serviceName, {
        serviceName: props.serviceName,
        cluster: props.cluster,
        assignPublicIp: true,
        taskDefinition
        });
        service.connections.allowFromAnyIpv4(ec2.Port.allTcp());

        service.enableServiceConnect({
        services: [
            {
                discoveryName: props.dnsName,
                portMappingName: props.portName,
                dnsName:props.dnsName,
                port: props.containerPort
            },
        ],
        namespace: props.namespaceName,
        })
    }
}