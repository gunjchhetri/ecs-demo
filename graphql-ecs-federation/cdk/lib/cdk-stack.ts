import { Stack, StackProps } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as path from 'path';
import { Port, Vpc } from 'aws-cdk-lib/aws-ec2';
import { DnsRecordType, PrivateDnsNamespace, RoutingPolicy, Service } from 'aws-cdk-lib/aws-servicediscovery';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
interface NetworkStackProps extends StackProps{
    environment: string
}
export class NetworkStack extends Stack {
  constructor(scope: Construct, id: string, props?: NetworkStackProps) {
    super(scope, id, props);
    const vpc = new Vpc(this, 'DemoVpc', { maxAzs: 3 });
    const cluster = new ecs.Cluster(this, 'DemoCluster', { vpc: vpc });
    new ecsp.ApplicationLoadBalancedFargateService(this, 'ecs-server', {
      desiredCount:2,
      cluster:cluster,  
      cpu:512,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '../../src')),
      },
      memoryLimitMiB:2048,
      publicLoadBalancer: true, 
    }); 
    const taskDefinition = new ecs.FargateTaskDefinition(this, "RedisTaskDefinition", {
      cpu: 512,
      memoryLimitMiB: 2048,
      
    });
    taskDefinition.addContainer("FargateContainer", {
      image: ecs.ContainerImage.fromRegistry('redis:3.2'),
      logging: ecs.LogDriver.awsLogs({ streamPrefix: "redisService" }),
      portMappings: [
        { containerPort: 6379 } // important. Default is no port mapping
      ]
    });
    
    const ecsService = new ecs.FargateService(this, 'RedisService', {
       cluster,
       taskDefinition
    });
    ecsService.connections.allowFromAnyIpv4(Port.allTcp());
    const cloudMapNamespace = new PrivateDnsNamespace(this, `ServiceDiscoveryNamespace`, {
      name: 'redis-server.com', // The domain your want to use in the DNS lookup
      vpc: vpc
    });
  
  const cloudMapService = new Service(this, `ServiceDiscovery`, {
    namespace: cloudMapNamespace,
    dnsRecordType: DnsRecordType.A,
    dnsTtl: cdk.Duration.seconds(300),
    name: 'redis-server', // will be used as a subdomain of the domain set in the namespace
    routingPolicy: RoutingPolicy.WEIGHTED,
    loadBalancer: true // Important! If you choose WEIGHTED but don't set this, the routing policy will default to MULTIVALUE instead
   })
  
  ecsService.associateCloudMapService({
    service: cloudMapService
   })
  }
}
