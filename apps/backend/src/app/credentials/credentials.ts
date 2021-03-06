import { Get } from '@nestjs/common';
import { STS } from "aws-sdk";
import {AssumeRoleRequest} from "aws-sdk/clients/sts";

export class AwsCredentials {
  private sts: STS;
  RoleArn = "arn:aws:iam::815160866095:role/service-role/AmazonPersonalize-ExecutionRole-1614297880317"

  constructor() {
    this.sts = new STS();
  }

  @Get("/api/aws/credentials")
  getCredentials() {
    const params:AssumeRoleRequest = {
      RoleSessionName: "current",
      RoleArn: this.RoleArn
    };
    return this.sts.assumeRole(params)
  }

}
