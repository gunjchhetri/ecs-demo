import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import { PrivateDnsNamespace } from 'aws-cdk-lib/aws-servicediscovery';
import { Stack, StackProps } from 'aws-cdk-lib';

export class ClusterStack extends Stack {
  cluster: ecs.ICluster;
  privateDnsNamespace: PrivateDnsNamespace;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, 'DemoVpc', { maxAzs: 3 });
    // Create a cluster inside the vpd, the cluster will be hosting the different services
    this.cluster = new ecs.Cluster(this, 'DemoCluster', { 
        vpc,
        clusterName: 'DemoCluster' 
    });
    this.privateDnsNamespace = new PrivateDnsNamespace(this, "DemoPrivateDnsNamespace", {
      name: `app.server`,
      vpc,
    });
  }
}