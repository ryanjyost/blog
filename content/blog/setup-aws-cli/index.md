---
title: "Deploy React Apps to AWS: Part 1 - Setting up the AWS CLI"
date: "2019-11-16"
description: The first step to using AWS resources to host your React apps.
---

The AWS CLI is essential to working with AWS services like S3, CloudFront, Lambda, etc. Sure, you can configure
resources using the AWS Console, but that can be incredibly time-consuming and doesn't scale.

For example, I've been using AWS to host my React apps. The CLI is essential to deploying my `/build` directory
whenever I have updated code. And When I start a new project, creating new resources in the AWS Console is annoying and
takes a while - plus I always forget something. So I've started using CloudFormation to provision AWS resources and
CircleCI for a CI/CD pipeline, both of which require using the AWS CLI.

## Create an AWS account

If you haven't already, [create an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).

## Create an IAM User

In your account's AWS Console, navigate to the IAM module. <br/>
![Image](https://yosts-posts.s3.amazonaws.com/nav-to-iam.png)

In the "Users" section, open the form to add a new IAM user.
![Image](https://yosts-posts.s3.amazonaws.com/nav-to-users.png)

Enter a user name and grant programmatic access, which will grant access keys to the user to authorize
actions taken via the AWS CLI. Proceed to the next step.
![Image](https://yosts-posts.s3.amazonaws.com/create-user-step-1.png)

Give the user blanket admin access.
![Image](https://yosts-posts.s3.amazonaws.com/create-user-perms.png)

Click next until the review step and submit the form by clicking "Create User".

On the success page, **be sure to download the CSV with your new user's AWS Access Key and Secret Access Key.**
![Image](https://yosts-posts.s3.amazonaws.com/create-user-success.png)

## Install and Configure the AWS CLI

[Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html) on your machine.

Once installed, run the command to quickly [configure your AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html#cli-quick-configuration).

```dotenv
> aws configure
```

You'll be prompted in the terminal to enter the `AccessKey` and `SecretAccessKey` you downloaded to CSV.

Also provide your default [AWS Region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html).

```dotenv
AWS Access Key ID [None]: <AccessKey>
AWS Secret Access Key [None]: <SecretAccessKey>
Default region name [None]: <Region> // e.g. us-east-1
Default output format [None]: json
```

To verify that your CLI credentials are properly configured, run the following command, which will output your
credentials.

```dotenv
> cat ~/.aws/credentials
[default]
aws_access_key_id=<AccessKey>
aws_secret_access_key=<SecretAccessKey>
```

## And that's it!

Stay tuned for future installments of this series.
