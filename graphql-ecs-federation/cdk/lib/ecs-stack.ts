import * as cdk from 'aws-cdk-lib';
import { NamespaceType, PrivateDnsNamespace } from 'aws-cdk-lib/aws-servicediscovery';
import { Construct } from 'constructs';
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsp from 'aws-cdk-lib/aws-ecs-patterns';
import * as path from "path";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { ServiceConstruct } from './service-construct';

 
export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, 'DemoVpc', { maxAzs: 2 ,
      subnetConfiguration: [
      {
        subnetType: ec2.SubnetType.PUBLIC,
        name: 'Public',
      },
    ], });
    const appNameSpace ='app.server';
    // const privateDnsNamespace = new PrivateDnsNamespace(this, "DemoPrivateDnsNamespace", {
    //   name: `app.server`,
    //   vpc,
    // });
    // Create a cluster inside the vpd, the cluster will be hosting the different services
    const cluster = new ecs.Cluster(this, 'DemoCluster', { 
        vpc,
        clusterName: 'DemoCluster',
        defaultCloudMapNamespace: {
          name: appNameSpace,
          useForServiceConnect: true,
          type: NamespaceType.DNS_PRIVATE,
          vpc
      },
    });
    
    // privateDnsNamespace.createService('pDns');
    const gatewayService =new ecsp.ApplicationLoadBalancedFargateService(this, 'gateway-server', {
        serviceName: 'GatewayServer',
        desiredCount:2,
        minHealthyPercent: 100,
        cluster,  
        healthCheckGracePeriod:cdk.Duration.seconds(20),
        cpu:512,
        assignPublicIp: true,
        taskImageOptions: {
          enableLogging: true,
          logDriver: ecs.LogDrivers.awsLogs({ streamPrefix: 'my-log-group', logRetention: 7 }),
          containerPort:80,
          image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '../../gateway')),
          //image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, '../../app')),
        },
        memoryLimitMiB:2048,
        publicLoadBalancer: true
      });
      gatewayService.targetGroup.configureHealthCheck({
        path:'/?query=%7B__typename%7D',
        healthyHttpCodes:"200,400"
      });
      gatewayService.service.enableServiceConnect({
        
        namespace: appNameSpace,
        });
      
     const booksService = new ServiceConstruct(this, 'BookService', {
        imagePath: path.resolve(__dirname, '../../service-books'),
        containerPort: 8080,
        cluster,
        namespaceName: appNameSpace,
        serviceName: 'BookService',
        dnsName: 'books',
        portName: 'books'
      });
      const authorService = new ServiceConstruct(this, 'AuthorService', {
        imagePath: path.resolve(__dirname, '../../service-author'),
        containerPort: 8000,
        cluster: cluster,
        namespaceName: appNameSpace,
        serviceName: 'AuthorService',
        dnsName: 'authors',
        portName: 'authors'
      });
      gatewayService.node.addDependency(authorService);
      gatewayService.node.addDependency(booksService);
  }
}